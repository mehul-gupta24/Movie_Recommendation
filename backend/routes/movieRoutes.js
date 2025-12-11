const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movies', movieController.getAllMovies);
router.get('/recommend', movieController.getRecommendations);
router.get('/suggestions', movieController.getSuggestions);

module.exports = router;
