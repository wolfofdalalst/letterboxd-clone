import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import toastConfig from '../config/toast.js';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
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
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:1337/api/user',
        formData
      );
      console.log(response);
      navigate('/login');
    } catch (err) {
      // TODO: handle different errors
      console.log(err);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setError('Failed to register, please try again.');
      toast.error('Failed to register, please try again.');
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1>Join Letterboxd</h1>
        <label htmlFor='name'>Full Name</label>
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={formData.name}
        />
        <label htmlFor='email'>Email address</label>
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
        <button type='submit'>Submit</button>
      </form>
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default RegisterForm;
