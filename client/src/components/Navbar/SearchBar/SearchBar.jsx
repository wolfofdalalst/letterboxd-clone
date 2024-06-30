import { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

const SearchBar = ({ updateSearch }) => {
  const [value, setValue] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const navigate = useNavigate();

  const toggleSearch = () => {
    setValue('');
    setSearchClicked((prev) => !prev);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      updateSearch(value);
      setSearchClicked(false);
      navigate('/search');
    } else if (event.key === 'Escape') {
      setSearchClicked(false);
    }
  };

  return (
    <>
      {!searchClicked ? (
        <FaSearch
          className='search-icon'
          onClick={toggleSearch}
        />
      ) : (
        <>
          <FaPlus
            className='close-icon'
            onClick={toggleSearch}
          />
          <input
            className='search-bar'
            type='text'
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </>
  );
};

export default SearchBar;
