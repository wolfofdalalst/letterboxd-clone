import './MovieCard.css';

function MovieCard({ name, year, poster_path }) {
  return (
    <div className='movie-card'>
      <img src={poster_path} />
      <p>
        {name} ({year})
      </p>
    </div>
  );
}

export default MovieCard;
