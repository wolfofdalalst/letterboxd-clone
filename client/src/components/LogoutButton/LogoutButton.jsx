import AuthService from '@api/AuthService';
import toastConfig from '@config/toastConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './LogoutButton.css';

const LogoutButton = ({ updateIsLogged }) => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await AuthService.logout();
      toast.success('Logout succesful!', toastConfig);
      navigate('/login');
    } catch (error) {
      toast.error(error.message, toastConfig);
      console.error(error);
    } finally {
      updateIsLogged(false);
    }
  }

  return (
    <button
      className='logout'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
