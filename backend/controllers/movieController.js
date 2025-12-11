const axios = require('axios');
const movies = require('../data/movies_dataframe.json');
const BM25 = require('../utils/BM25');

// Initialize BM25
const tokenizedCorpus = movies.map(movie => movie.tags);
const bm25 = new BM25();
bm25.addDocuments(tokenizedCorpus);

// Cache for movie posters/links
const movieDataCache = new Map();

// OMDb API helper
async function fetchOMDbData(title) {
  const params = {
    apikey: process.env.OMDB_API_KEY,
    t: title,
    type: 'movie'
  };

  try {
    const response = await axios.get('http://www.omdbapi.com/', { params });
    const data = response.data;
    
    if (data.Response === 'True') {
      return {
        imdbID: data.imdbID,
        Poster: data.Poster || 'https://via.placeholder.com/400x600?text=No+Poster'
      };
    }
    
    return {
      imdbID: null,
      Poster: 'https://via.placeholder.com/400x600?text=No+Poster'
    };

  } catch (error) {
    console.error(`OMDb API error for ${title}:`, error.response?.data || error.message);
    return {
      imdbID: null,
      Poster: 'https://via.placeholder.com/400x600?text=No+Poster'
    };
  }
}

exports.getAllMovies = (req, res) => {
  const titles = movies.map(movie => movie.title);
  res.json(titles);
};

exports.getRecommendations = async (req, res) => {
  const title = req.query.title;
  const n = parseInt(req.query.n) || 5;

  // Find selected movie
  const movieIndex = movies.findIndex(m => 
    m.title.toLowerCase() === title.toLowerCase()
  );
  
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const movie = movies[movieIndex];
  
  // Get BM25 scores
  const scores = bm25.getScores(movie.tags);
  const scoredMovies = scores.map((score, idx) => ({ idx, score }));
  scoredMovies.sort((a, b) => b.score - a.score);
  
  // Get top N recommendations (exclude original)
  const recommendations = [];
  for (const { idx } of scoredMovies.slice(1, n + 1)) {
    const movie = movies[idx];
    let movieData = movieDataCache.get(movie.title);

    if (!movieData) {
      try {
        const { imdbID, Poster } = await fetchOMDbData(movie.title);
        movieData = {
          id: movie.movieid,
          title: movie.title,
          poster: Poster || 'https://via.placeholder.com/150',
          imdbLink: imdbID 
            ? `https://www.imdb.com/title/${imdbID}/` 
            : null
        };
        movieDataCache.set(movie.title, movieData);
      } catch (error) {
        console.error(`Failed to fetch data for ${movie.title}:`, error);
        movieData = {
          id: movie.movieid,
          title: movie.title,
          poster: 'https://via.placeholder.com/150',
          imdbLink: null
        };
      }
    }
    recommendations.push(movieData);
  }

  // Make sure each recommendation includes IMDb data
  const recommendationsWithIMDb = await Promise.all(
    recommendations.map(async (movie) => {
      const omdbData = await fetchOMDbData(movie.title);
      return {
        ...movie,
        imdbID: omdbData.imdbID,
        poster: omdbData.Poster
      };
    })
  );

  res.json(recommendationsWithIMDb);
};

exports.getSuggestions = (req, res) => {
  const query = req.query.q.toLowerCase();
  console.log(`[SUGGESTIONS] Query received:`, query);
  const suggestions = movies
    .filter(movie => movie.title.toLowerCase().includes(query))
    .slice(0, 5)
    .map(movie => ({
      title: movie.title,
      year: movie.year || (movie.release_date ? String(movie.release_date).slice(0, 4) : null),
      imdbID: movie.imdbID || movie.imdb_id || null
    }));
  console.log(`[SUGGESTIONS] Suggestions sent:`, suggestions);
  res.json(suggestions);
};
