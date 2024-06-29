import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthService from '@api/AuthService';
import toastConfig from '@config/toastConfig';

const LoginForm = ({ updateIsLogged }) => {
  const [formData, setFormData] = useState({
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
      await AuthService.login(formData.email, formData.password);
      updateIsLogged(true);
      navigate('/');
    } catch (error) {
      toast.error(error.message, toastConfig);
      console.log(error);
      setFormData({ email: '', password: '' });
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
    </div>
  );
};

export default LoginForm;
