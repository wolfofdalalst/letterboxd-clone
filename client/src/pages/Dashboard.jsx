/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

import './Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [movieArray, setMovieArray] = useState([]);

  const config = { withCredentials: true };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(
          'http://localhost:1337/api/user/profile',
          config
        );
        setUserData(profileResponse.data);
        const movieResponse = await axios.get(
          'http://localhost:1337/api/movie/popular',
          config
        );
        setMovieArray(movieResponse.data);
      } catch (error) {
        console.error('error while getting list of popular movies');
        navigate('/login');
      }
    };
    fetchData();
  }, []);

  return (
    <div className='dashboard'>
      <h1 className='welcome'>
        Welcome back,{' '}
        <span className='name'>
          {userData === null ? 'world' : userData.name}
        </span>
        . Here&apos;s what we&apos;ve been watching...
      </h1>
      <p className='section-heading'>popular on letterboxd</p>
      <div className='popular-container'>
        {movieArray.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              name={movie.title}
              poster_path={movie.poster_path}
              year={new Date(movie.release_date).getFullYear()}
            />
          );
        })}
      </div>
      <SearchBar />
    </div>
  );
}

export default Dashboard;
