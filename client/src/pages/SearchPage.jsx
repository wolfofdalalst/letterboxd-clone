import { useEffect, useState } from 'react';
import axios from 'axios';

import './SearchPage.css';
import SearchCard from '../components/SearchCard';

function SearchPage({ search }) {
  const [movieArray, setMovieArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:1337/api/movie/suggestion?search=' + search,
          { withCredentials: true }
        );
        console.log(data);
        setMovieArray(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className='search-page'>
      <div className='search-result'>
        <p className='search-heading'>Results matching for &apos;{search}&apos;</p>
        {movieArray.map((movie, index) => (
          <SearchCard
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
}

export default SearchPage;
