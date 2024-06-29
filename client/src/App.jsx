import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import LoginForm from './pages/Login/Login.jsx';
import MoviePage from './pages/MoviePage/MoviePage.jsx';
import RegisterForm from './pages/Register/Register.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
// TODO: implement react spinners
// BUG: upon reloading the state loginStatus is set to its default value, false

function App() {
  let [isLogged, setIsLogged] = useState(false);
  let [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await axios.get(
          'http://localhost:1337/api/user/profile',
          { withCredentials: true }
        );
        setIsLogged(response.status === 200);
      } catch (error) {
        console.error('not logged in', error);
        setIsLogged(false);
      }
    };
    fetchLogin();
  }, []);

  return (
    <>
      <Navbar
        loginStatus={isLogged}
        updateIsLogged={setIsLogged}
        updateSearch={setSearch}
      />
      <Routes>
        <Route
          path='/'
          element={<Dashboard />}
        />
        <Route
          path='/login'
          element={<LoginForm updateIsLogged={setIsLogged} />}
        />
        <Route
          path='/register'
          element={<RegisterForm />}
        />
        <Route
          path='/search'
          element={<SearchPage search={search} />}
        />
        <Route
          path='/movie/:id'
          element={<MoviePage />}
        />
      </Routes>
      <ToastContainer />
      {/* TODO: create footer */}
    </>
  );
}

export default App;
