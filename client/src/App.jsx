import { Route, Routes } from 'react-router-dom';
import RegisterForm from './pages/Register.jsx';
import LoginForm from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from './pages/SearchPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
      </Routes>
      {/* TODO: create footer */}
    </>
  );
}

export default App;
