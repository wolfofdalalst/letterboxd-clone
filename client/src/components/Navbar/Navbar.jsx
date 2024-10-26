import logo from '@assets/letterboxd-logo.png';
import LogoutButton from '@components/LogoutButton/LogoutButton';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar/SearchBar';

import './Navbar.css';

const Navbar = ({ loginStatus, updateIsLogged, updateSearch }) => {
  return (
    <div className='navbar'>
      {/* Logo and Home Link */}
      <div className='logo'>
        <img
          src={logo}
          alt='letterboxd-logo'
        />
        <Link to='/'>Letterboxd</Link>
      </div>

      {/* Authentication Links */}
      {!loginStatus && (
        <div className='auth-panel'>
          <Link to='/login'>SIGN IN</Link>
          <Link to='/register'>CREATE ACCOUNT</Link>
        </div>
      )}

      {/* Navigation Links */}
      <div className='nav-links'>
        <Link to='/films'>FILMS</Link>
        <Link to='/lists'>LISTS</Link>
        <Link to='/members'>MEMBERS</Link>
        <Link to='/journal'>JOURNAL</Link>
      </div>

      {/* Search Bar and Logout Button */}
      {loginStatus && (
        <>
          <SearchBar updateSearch={updateSearch} />
          <LogoutButton updateIsLogged={updateIsLogged} />
        </>
      )}
    </div>
  );
};

export default Navbar;
