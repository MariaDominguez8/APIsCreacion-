const express = require('express');
const router = express.Router();

const {findAllGenres, findById} = require('../controllers/api/genresController')

const {findAllMovies, createMovie, findMovieById, deleteMovieById} = require('../controllers/api/moviesController')


//Genres
router.get('/genres', findAllGenres);
router.get('/genres/:id', findById);

// Movies
router.get('/movies', findAllMovies);
router.get('/movies/:id', findMovieById);

router.post('/movies/create', createMovie)
router.delete('/movies/:id', deleteMovieById);

module.exports = router;