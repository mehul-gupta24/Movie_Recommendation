const express = require('express');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');
const loggingMiddleware = require('./middlewares/logging');
const movies = require('./data/movies_dataframe.json');

const app = express();
app.use(cors());
const PORT = 3001;

// Apply logging middleware
app.use(loggingMiddleware);

// Apply routes
app.use('/api', movieRoutes);

// Add a root route for friendly message or default Express behavior
app.get('/', (req, res) => {
  res.status(404).send('Cannot Get/');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Loaded ${movies.length} movies`);
  console.log(`Sample movie: ${movies[0].title} (ID: ${movies[0].movieid})`);
});
