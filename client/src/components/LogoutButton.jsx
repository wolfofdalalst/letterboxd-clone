import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ updateIsLogged }) {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await axios.post(
        'http://localhost:1337/api/user/logout',
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      updateIsLogged(false);
    }
  }
  return (
    <button
      className='logout-btn'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
