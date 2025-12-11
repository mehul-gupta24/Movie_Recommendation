import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { movieApi } from '../services/api';

export const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const results = await movieApi.getSuggestions(query);
        console.log('Suggestions fetched in SearchBar:', results); // Debug log
        setSuggestions(results);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Use only title if year is missing
    const searchQuery = suggestion.year ? `${suggestion.title} (${suggestion.year})` : suggestion.title;
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            placeholder="Search for a movie to get AI-powered recommendations..."
            className="w-full pl-16 pr-24 py-5 text-lg bg-gray-900/90 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl focus:border-purple-500/50 focus:outline-none focus:ring-0 search-glow transition-all duration-300 shadow-2xl text-white placeholder-gray-400"
            disabled={loading}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 border border-gray-700 bg-gray-900 rounded-xl shadow-xl max-h-72 overflow-y-auto"
          style={{ minHeight: suggestions.length === 0 ? 48 : undefined, display: query.length >= 2 ? 'block' : 'none' }}
        >
          {suggestions.length === 0 ? (
            <div className="px-4 py-3 text-gray-400 text-center">No suggestions found</div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {suggestions.map((suggestion, index) => {
                const year = suggestion.year || '';
                const imdbID = suggestion.imdbID || '';
                return (
                  <li
                    key={`${imdbID || suggestion.title || index}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex flex-col px-4 py-3 cursor-pointer transition-all duration-200 text-white hover:bg-purple-800/20 ${
                      index === selectedIndex ? 'bg-purple-700/30 border-l-4 border-purple-500' : ''
                    } ${index === 0 ? 'rounded-t-xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    <span className="font-semibold text-base">{suggestion.title}</span>
                    <span className="text-xs text-gray-400 mt-1">{year ? year : <span className="italic text-gray-600">Year unknown</span>}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};