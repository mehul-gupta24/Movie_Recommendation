import React from 'react';
import { Film, Search, Sparkles, Star } from 'lucide-react';

export const EmptyState = ({ hasSearched }) => {
  if (hasSearched) {
    return (
      <div className="text-center py-20">
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20"></div>
          <Search className="relative w-20 h-20 text-gray-400 mx-auto floating-animation" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">No recommendations found</h3>
        <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
          We couldn't find any movies similar to your search. Try searching for a different movie title.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-20 relative">
      <div className="star-field opacity-30"></div>
      <div className="relative z-10">
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-3xl opacity-30 pulse-glow"></div>
          <Film className="relative w-24 h-24 text-purple-400 mx-auto floating-animation" />
        </div>
        <h3 className="text-4xl font-bold text-white mb-6">
          Discover Your Next 
          <span className="text-gradient block mt-2">Favorite Movie</span>
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed mb-8">
          Search for a movie you love, and our AI-powered recommendation engine will suggest similar films you'll enjoy. 
          Get personalized recommendations based on advanced natural language processing.
        </p>
        
        <div className="flex items-center justify-center gap-8 text-gray-400 mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="font-medium">Personalized</span>
          </div>
          <div className="flex items-center gap-3">
            <Film className="w-6 h-6 text-blue-400" />
            <span className="font-medium">Curated</span>
          </div>
        </div>
      </div>
    </div>
  );
};