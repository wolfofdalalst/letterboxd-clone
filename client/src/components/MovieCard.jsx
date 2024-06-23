import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({id, name, year, poster_path }) {
  const navigate = useNavigate();
  return (
    <div className='movie-card' onClick={() => navigate(`/movie/${id}`)}>
      <img src={poster_path} />
      <p>
        {name} ({year})
      </p>
    </div>
  );
}

export default MovieCard;
