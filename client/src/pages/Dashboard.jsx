/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import './Dashboard.css';
import { FaBolt } from 'react-icons/fa';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [movieArray, setMovieArray] = useState([]);
  const [activityArray, setActivityArray] = useState([]);

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

    const fetchActivity = async () => {
      try {
        let {
          data: { watched: watchedArray },
        } = await axios.get('http://localhost:1337/api/user/profile', {
          withCredentials: true,
        });
        watchedArray = watchedArray.filter(
          (value) => typeof value === 'number'
        );
        watchedArray = await Promise.all(
          watchedArray.map(
            async (value) =>
              (await axios.get(
                `http://localhost:1337/api/movie/details/${value}`,
                { withCredentials: true }
              )).data
          )
        );
        setActivityArray(watchedArray.slice(0,5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivity();
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
      {activityArray.length > 0 && (
        <>
          <p className='section-heading'>your activity <FaBolt className='bolt'/></p>
          <div className='activity-container'>
            {activityArray.map((movie, index) => (
              <MovieCard
                key={index}
                id={movie.id}
                name={movie.title}
                poster_path={movie.poster_path}
                year={new Date(movie.release_date).getFullYear()}
              />
            ))}
          </div>
        </>
      )}
      <p className='section-heading'>popular on letterboxd</p>
      <div className='popular-container'>
        {movieArray.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              id={movie.id}
              name={movie.title}
              poster_path={movie.poster_path}
              year={new Date(movie.release_date).getFullYear()}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
