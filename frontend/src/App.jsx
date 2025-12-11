import React, { useState } from 'react';
import { Film, Sparkles, Github, Heart, Zap, Star, Award } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { LoadingCard } from './components/LoadingCard';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { movieApi } from './services/api';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSearchQuery(query);
    setHasSearched(true);
    
    try {
      const results = await movieApi.getRecommendations(query);
      console.log('Fetched recommendations:', results); // DEBUG LOG
      setRecommendations(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Remove debug JSON output */}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="gradient-bg">
          <div className="star-field opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-white/20 rounded-3xl blur-lg"></div>
              <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <Film className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
              CineMatch
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-light mb-4 text-purple-100">
            NLP - Powered Movie Recommendations
          </p>
          <p className="text-lg text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover your next favorite film with our advanced machine learning algorithms
          </p>
          
          <div className="flex items-center justify-center gap-8 text-purple-200 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Advanced NLP</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Perfect Match</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Award className="w-5 h-5 text-green-400" />
              <span className="font-medium">Personalized</span>
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading ? (
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 text-purple-300 bg-gray-800/50 backdrop-blur-md px-8 py-4 rounded-2xl border border-purple-500/30">
                <div className="relative">
                  <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-3 border-pink-500/30 rounded-full animate-ping"></div>
                </div>
                <span className="text-xl font-semibold">Finding perfect recommendations...</span>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          </div>
        ) : recommendations.length > 0 ? (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-gradient">Recommended</span> for You
              </h2>
              <p className="text-gray-300 text-xl">
                Based on "{searchQuery}" • {recommendations.length} recommendations found
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-gray-300 ml-2">AI-Curated Selection</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recommendations.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState hasSearched={hasSearched} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gradient">CineMatch</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Powered by advanced NLP algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Made By Alluri Lakshman Narendra and Attunuri Praneeth Reddy</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700/50 text-center text-gray-500">
            <p>&copy; 2024 CineMatch. Discover movies like never before.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;