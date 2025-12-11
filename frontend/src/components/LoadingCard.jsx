import React from 'react';

export const LoadingCard = () => {
  return (
    <div className="movie-card-gradient rounded-3xl shadow-2xl overflow-hidden border border-gray-700/30">
      <div className="h-96 bg-gradient-to-br from-gray-700 to-gray-800 shimmer relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/80 space-y-4">
        <div className="h-7 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shimmer"></div>
        <div className="h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shimmer w-3/4"></div>
        <div className="flex gap-3">
          <div className="h-7 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full shimmer w-20"></div>
          <div className="h-7 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full shimmer w-16"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded shimmer w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded shimmer w-4/6"></div>
        </div>
        <div className="h-12 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl shimmer"></div>
      </div>
    </div>
  );
};