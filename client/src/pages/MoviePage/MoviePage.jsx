import { useEffect, useState } from 'react';
import {
  FaClock,
  FaEye,
  FaHeart,
  FaRegClock,
  FaRegEye,
  FaRegHeart,
  FaRegStar,
  FaStar,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import getYear from '@utils/getYear';

import MovieService from '@api/MovieService';
import toastConfig from '@config/toastConfig';
import { toast } from 'react-toastify';
import './MoviePage.css';

// TODO: add support for half ratings
const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [userInteraction, setUserInteraction] = useState({
    watched: false,
    liked: false,
    watchlist: false,
  });

  const rating = Math.ceil(movie?.vote_average / 2) || 0;

  const { id } = useParams();
  const movieId = Number(id);

  const handleUserInteraction = async (action) => {
    try {
      const actionResponse = userInteraction[action]
        ? await MovieService.patchMovieAction(movieId, action)
        : await MovieService.postMovieAction(movieId, action);
      setUserInteraction((prev) => ({
        ...prev,
        [action]: !prev[action],
      }));
      console.log(actionResponse);
      userInteraction[action]
        ? toast.info(`${movie.title} removed from ${action}`, toastConfig)
        : toast.success(`${movie.title} added to ${action}`, toastConfig);
    } catch (error) {
      console.error(`Error updating ${action}`, error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await MovieService.movieDetails(movieId);
        setMovie(movieResponse);
      } catch (error) {
        toast.error(error.message, toastConfig);
        console.error(error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await MovieService.userProfile();
        setUserInteraction({
          liked: user.liked.includes(movieId),
          watched: user.watched.includes(movieId),
          watchlist: user.watchlist.includes(movieId),
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
    fetchMovie();
  }, [movieId]);

  return (
    <div className='movie-page'>
      <div className='movie-detail'>
        <div className='poster'>
          <img
            className='movie-poster'
            src={movie?.poster_path}
            alt={`${movie?.title} poster`}
          />
        </div>
        <div className='text'>
          <p className='movie-title'>
            {movie?.title}
            <span className='movie-year'>
              {getYear(movie?.release_date) || ''}
            </span>
          </p>
          <p className='movie-tagline'>{movie?.tagline}</p>
          <p className='movie-overview'>
            {movie?.overview}
            <div className='movie-genre-container'>
              {movie?.genres.map((genre, index) => (
                <div
                  className='movie-genre'
                  key={index}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </p>
        </div>
        <div className='movie-rating'>
          <div className='action-row1'>
            <div
              className='watch'
              onClick={() => handleUserInteraction('watched')}
            >
              {userInteraction.watched ? (
                <>
                  <FaEye className='green-icon' />
                  <p>Watched</p>
                </>
              ) : (
                <>
                  <FaRegEye />
                  <p>Watch</p>
                </>
              )}
            </div>
            <div
              className='like'
              onClick={() => handleUserInteraction('liked')}
            >
              {userInteraction.liked ? (
                <>
                  <FaHeart className='red-icon' />
                  <p>Liked</p>
                </>
              ) : (
                <>
                  <FaRegHeart />
                  <p>Like</p>
                </>
              )}
            </div>
            <div
              className='watch-list'
              onClick={() => handleUserInteraction('watchlist')}
            >
              {userInteraction.watchlist ? (
                <FaClock className='blue-icon' />
              ) : (
                <FaRegClock />
              )}
              <p>Watchlist</p>
            </div>
          </div>
          <div className='action-row2'>
            <p>Ratings</p>
            {Array(rating)
              .fill(null)
              .map((_, index) => (
                <FaStar
                  key={index}
                  className='star'
                />
              ))}
            {Array(5 - rating)
              .fill(null)
              .map((_, index) => (
                <FaRegStar
                  key={index}
                  className='star'
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
