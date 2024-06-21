import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function SearchBar({ updateSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // array that contains the suggestions
        const { data } = await axios.get(
          'http://localhost:1337/api/movie/suggestion?search=' + value,
          { withCredentials: true }
        );
        updateSearch(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [value]);

  return (
    <>
      <FaSearch className='search-icon' />
      <input
        type='text'
        placeholder='Search for movie...'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}

export default SearchBar;
