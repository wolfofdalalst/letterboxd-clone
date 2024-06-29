import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import toastConfig from '@config/toastConfig';
import AuthService from '@api/AuthService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
      await AuthService.register(
        formData.name,
        formData.email,
        formData.password
      );
      toast.success('User registered. Proceed to login.', toastConfig);
      navigate('/login');
    } catch (error) {
      toast.error(error.message, toastConfig);
      console.error(error);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
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
};

export default RegisterForm;
