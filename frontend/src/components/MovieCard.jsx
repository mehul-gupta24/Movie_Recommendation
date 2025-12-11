import React from 'react';
import { ExternalLink, Calendar, Star, Play } from 'lucide-react';

// Utility to capitalize each word
function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const MovieCard = ({ movie }) => {
  const hasValidImdbId = movie.imdbID && movie.imdbID !== 'null' && movie.imdbID !== 'undefined';
  const posterUrl = movie.poster && movie.poster !== 'N/A' 
    ? movie.poster 
    : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;

  const handleImdbClick = () => {
    if (hasValidImdbId) {
      window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group relative movie-card-gradient rounded-3xl shadow-2xl overflow-hidden card-hover border border-gray-700/30">
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target;
            target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 pulse-glow">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
        
        {hasValidImdbId && (
          <button
            onClick={handleImdbClick}
            className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:scale-110"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        )}

        {/* Rating badge */}
        {movie.rating && (
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{movie.rating}</span>
          </div>
        )}
      </div>

      <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm">
        <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
          {toTitleCase(movie.title)}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
          {movie.year && (
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{movie.year}</span>
            </div>
          )}
        </div>

        {movie.genre && (
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.split(',').slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-xs rounded-full font-medium backdrop-blur-sm"
              >
                {genre.trim()}
              </span>
            ))}
          </div>
        )}

        {movie.plot && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">
            {movie.plot}
          </p>
        )}

        {hasValidImdbId && (
          <button
            onClick={handleImdbClick}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 group/btn"
          >
            <span>View on IMDb</span>
            <ExternalLink className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};