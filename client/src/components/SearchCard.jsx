/* 
{
  "adult": false,
  "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  "genre_ids": [
    878,
    12
  ],
  "id": 693134,
  "original_language": "en",
  "original_title": "Dune: Part Two",
  "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  "popularity": 669.024,
  "poster_path": "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  "release_date": "2024-02-27",
  "title": "Dune: Part Two",
  "video": false,
  "vote_average": 8.172,
  "vote_count": 4592
}
*/

import { Link } from 'react-router-dom';
import './SearchCard.css';

function SearchCard({ movie }) {
  return (
    <div className='search-card'>
      <Link to={`/movie/${movie.id}`} className='movie-link'>
        <img
          src={movie.poster_path}
          className='movie-poster'
        />
      </Link>
      <p className='movie-title'>
        {movie.title}
        <span className='movie-year'>
          {new Date(movie.release_date).getFullYear()}
        </span>
      </p>
      <p className='movie-overview'>{movie.overview}</p>
    </div>
  );
}

export default SearchCard;
