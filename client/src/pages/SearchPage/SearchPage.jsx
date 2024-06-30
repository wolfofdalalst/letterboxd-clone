import { useEffect, useState } from 'react';
import SearchMovieCard from './SearchMovieCard/SearchMovieCard';

import './SearchPage.css';
import MovieService from '@api/MovieService';
import { toast } from 'react-toastify';
import toastConfig from '@config/toastConfig';

const SearchPage = ({ search }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponse = await MovieService.searchMovie(search);
        setMovies(searchResponse);
      } catch (error) {
        toast.error(error.message, toastConfig);
        console.error(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className='search-page'>
      <div className='search-result'>
        <p className='search-heading'>
          Results matching for &apos;{search}&apos;
        </p>
        {movies.map((movie, index) => (
          <SearchMovieCard
            key={index}
            movie={movie}
          />
        ))}
      </div>
      <div className='search-filter'>
        <p className='search-heading'>Show results for</p>
      </div>
    </div>
  );
};

export default SearchPage;
