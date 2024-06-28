import axios from 'axios';
import expressAsyncHandler from 'express-async-handler';
import 'dotenv/config';
import { apiRequestConfig, urlIndex } from '../config.js';

/**
 * Maps the movie poster and backdrop paths to full URLs
 * @param {Object} movie - The movie object
 */
const imageUrlMap = (movie) => {
  movie.poster_path = urlIndex.tmdbImage + movie.poster_path;
  movie.backdrop_path = urlIndex.tmdbImage + movie.backdrop_path;
};

/**
 * Returns a list of popular movies
 * @route GET /movie/popular
 * @access Private
 */
const popularMovies = expressAsyncHandler(async (req, res) => {
  const {
    data: { results },
  } = await axios.get(`${urlIndex.tmdb}/movie/popular`, apiRequestConfig);
  const movies = results.slice(0, 10);
  movies.map(imageUrlMap);
  res.json(movies);
});

/**
 * Search for movies by name
 * @route GET /movie/search/:name
 * @access Private
 * @param {string} name - The movie name
 */
const searchMovies = expressAsyncHandler(async (req, res) => {
  const { name } = req.params;
  const searchQuery = encodeURIComponent(name ?? 'Morbius');
  const {
    data: { results: movies },
  } = await axios.get(
    `${urlIndex.tmdb}/search/movie?query=${searchQuery}`,
    apiRequestConfig
  );
  movies.sort((a, b) => b.popularity - a.popularity);
  movies.map(imageUrlMap);
  res.json(movies);
});

/**
 * Movie details by ID
 * @route GET /movie/details/:id
 * @access Private
 * @param {number} id - The movie ID
 */
const movieDetail = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: movie } = await axios.get(
    `${urlIndex.tmdb}/movie/${id}`,
    apiRequestConfig
  );
  imageUrlMap(movie);
  res.send(movie);
});

export { popularMovies, searchMovies, movieDetail };
