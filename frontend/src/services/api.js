import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const movieApi = {
  getSuggestions: async (query) => {
    if (query.length < 2) return [];
    
    try {
      const response = await api.get(`/suggestions?q=${encodeURIComponent(query)}`);
      console.log('Raw suggestions response:', response.data); // Debug log
      if (Array.isArray(response.data)) {
        response.data.forEach((item, idx) => {
          console.log(`Suggestion[${idx}]:`, item);
        });
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  },

  getRecommendations: async (title) => {
    try {
      const response = await api.get(`/recommend?title=${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Failed to get recommendations. Please try again.');
    }
  },
};