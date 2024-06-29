/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import toastConfig from '../../config/toastConfig.js';

const LoginForm = ({ updateIsLogged }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1337/api/user/auth', formData, {
        withCredentials: true,
      });
      updateIsLogged(true);
      navigate('/');
    } catch (err) {
      // TODO: check for different cases of errors
      console.error('error while logging', err);
      setError('incorrect username or password');
      setFormData({ email: '', password: '' });
      toast.error('incorrect username or password');
      updateIsLogged(false);
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1>Get Started</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          onChange={handleChange}
          value={formData.email}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={formData.password}
        />
        <button type='submit'>SIGN IN</button>
      </form>
      <ToastContainer {...toastConfig} />
    </div>
  );
};

export default LoginForm;
