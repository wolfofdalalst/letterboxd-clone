import axios from 'axios';
import expressAsyncHandler from 'express-async-handler';
import 'dotenv/config';
import Movie from '../models/movieModel.js';

const TMDB_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/original';
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

const imageUrlMap = (movie) => {
  movie.poster_path = TMDB_IMG_URL + movie.poster_path;
  movie.backdrop_path = TMDB_IMG_URL + movie.backdrop_path;
};

const api_config = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
};

const createMovie = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { movieId, rating, summary, watched, liked, watchlist } = req.body;

  const movieExists = await Movie.findOne({ movieId: movieId, user: userId });

  if (movieExists) {
    res.status(400);
    throw new Error('Movie already exists');
  }

  const movie = await Movie.create({
    movieId: movieId,
    rating: rating,
    watched: watched,
    liked: liked,
    watchlist: watchlist,
    summary: summary,
    user: userId,
  });

  if (movie) {
    // TODO: change this in the future
    res.send(movie);
  } else {
    res.status(400);
    throw new Error('Incorrect movie field inputs');
  }
});

// TODO: format the response
const listMovies = expressAsyncHandler(async (req, res) => {
  const movies = await Movie.find({ user: req.user._id });

  res.send(movies);
});

const popularMovies = expressAsyncHandler(async (req, res) => {
  const response = await axios.get(TMDB_URL + '/movie/popular', api_config);

  const movies = response.data.results.slice(0, 10); // get 10 popular movies only

  movies.map(imageUrlMap);

  res.send(movies); // send 5 popular movies
});

const queryMovies = expressAsyncHandler(async (req, res) => {
  const searchQuery = encodeURIComponent(req.query.search ?? 'Morbius');

  const response = await axios.get(
    TMDB_URL + '/search/movie?query=' + searchQuery,
    api_config
  );

  const movies = response.data.results;
  movies.sort((a, b) => b.popularity - a.popularity);
  movies.map(imageUrlMap);

  res.send(movies);
});

const movieDetail = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const response = await axios.get(TMDB_URL + '/movie/' + id, api_config);

  const movie = response.data;

  imageUrlMap(movie);

  res.send(movie);
});

// TODO: implement update and delete operation

export { createMovie, listMovies, popularMovies, queryMovies, movieDetail };
