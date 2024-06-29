import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchMovieCard from './SearchMovieCard/SearchMovieCard';

import './SearchPage.css';

const SearchPage = ({ search }) => {
  const [popularMovies, setPopularMoviesularMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:1337/api/movie/search/' + search,
          { withCredentials: true }
        );
        console.log(data);
        setPopularMoviesularMovies(data);
      } catch (error) {
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
        {popularMovies.map((movie, index) => (
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
