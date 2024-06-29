import { useEffect, useState } from 'react';
import { FaBolt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import MovieService from '@api/MovieService';
import MovieCard from './MovieCard/MovieCard';

import './Dashboard.css';
import { toast } from 'react-toastify';
import toastConfig from '@config/toastConfig';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [movieArray, setMovieArray] = useState([]);
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch user profile and popular movies on component mount
    const fetchData = async () => {
      try {
        const userDataResponse = await MovieService.userProfile();
        setUserData(userDataResponse);

        const popularMoviesResponse = await MovieService.popularMovies();
        setMovieArray(popularMoviesResponse);
      } catch (error) {
        toast.error(error, toastConfig);
        console.error(error);
        navigate('/login'); // Redirect to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    // Function to fetch user activity based on userData changes
    const fetchActivity = async () => {
      try {
        if (userData) {
          const updatedActivty = await Promise.all(
            userData.watched.map(
              async (id) => await MovieService.movieDetails(id)
            )
          );
          // First 5 watched movies
          setActivity(updatedActivty.slice(0, 5));
        }
      } catch (error) {
        toast.error(error, toastConfig);
        console.error(error);
      }
    };
    fetchActivity();
  }, [userData]);

  return (
    <div className='dashboard'>
      {/* Header section displaying user name */}
      <h1 className='welcome'>
        Welcome back,{' '}
        <span className='name'>
          {userData === null ? 'world' : userData.name}
        </span>
        . Here&apos;s what we&apos;ve been watching...
      </h1>

      {/* Display user activity if available */}
      {activity.length > 0 && (
        <>
          <p className='section-heading'>
            your activity <FaBolt className='bolt' />
          </p>
          <div className='activity-container'>
            {activity.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
              />
            ))}
          </div>
        </>
      )}

      {/* Section displaying popular movies */}
      <p className='section-heading'>popular on letterboxd</p>
      <div className='popular-container'>
        {movieArray.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
