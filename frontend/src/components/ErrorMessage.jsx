import React from 'react';
import { AlertCircle, RefreshCw, Zap } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-3xl blur opacity-25"></div>
      <div className="relative bg-gray-900/90 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 text-center">
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-lg"></div>
            <AlertCircle className="relative w-16 h-16 text-red-400 mx-auto pulse-glow" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
        <p className="text-red-300 mb-8 text-lg leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl font-semibold text-lg group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
            <Zap className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};