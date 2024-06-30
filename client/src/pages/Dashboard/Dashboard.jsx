import { useEffect, useState } from 'react';
import { FaBolt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import MovieService from '@api/MovieService';
import toastConfig from '@config/toastConfig';
import MovieCard from './MovieCard/MovieCard';

import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [movieArray, setMovieArray] = useState([]);
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch user profile and popular movies on component mount
    const fetchData = async () => {
      try {
        const userResponse = await MovieService.userProfile();
        setUser(userResponse);

        const popularMoviesResponse = await MovieService.popularMovies();
        setMovieArray(popularMoviesResponse ?? []);
      } catch (error) {
        toast.error(error.message, toastConfig);
        console.error(error);
        navigate('/login'); // Redirect to login page on error
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    // Function to fetch user activity based on user changes
    const fetchActivity = async () => {
      try {
        if (user && user.watched) {
          const updatedActivty = await Promise.all(
            user.watched.map(
              async (id) => await MovieService.movieDetails(id)
            )
          );
          // First 5 watched movies
          setActivity(updatedActivty.slice(0, 5) ?? []);
        }
      } catch (error) {
        toast.error(error.message, toastConfig);
        console.error(error);
      }
    };
    fetchActivity();
  }, [user]);

  return (
    <div className='dashboard'>
      {/* Header section displaying user name */}
      <h1 className='welcome'>
        Welcome back, <span className='name'>{user?.name ?? 'world'}</span>.
        Here&apos;s what we&apos;ve been watching...
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
