import { Link } from 'react-router-dom';
import getYear from '@utils/getYear';

import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card'>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path}
          alt={`Poster for ${movie.name}`}
        />
      </Link>
      <p>
        {movie.title} ({getYear(movie.release_date)})
      </p>
    </div>
  );
};

export default MovieCard;
