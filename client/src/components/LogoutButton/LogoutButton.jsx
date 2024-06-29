import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/AuthService';

import './LogoutButton.css';

const LogoutButton = ({ updateIsLogged }) => {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (error) {
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
}

export default LogoutButton;
