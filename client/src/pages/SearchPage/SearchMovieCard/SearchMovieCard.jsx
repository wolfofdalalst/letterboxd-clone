import { Link } from 'react-router-dom';
import './SearchMovieCard.css';

const SearchMovieCard = ({ movie }) => {
  return (
    <div className='search-card'>
      <Link
        to={`/movie/${movie.id}`}
        className='movie-link'
      >
        <img
          src={movie.poster_path}
          className='movie-poster'
        />
      </Link>
      <p className='movie-title'>
        {movie.title}
        <span className='movie-year'>
          {new Date(movie.release_date).getFullYear() || ''}
        </span>
      </p>
      <p className='movie-overview'>{movie.overview}</p>
    </div>
  );
};

export default SearchMovieCard;
