import { Slide } from 'react-toastify';

// Toast configuration
// see - https://fkhadra.github.io/react-toastify/introduction/
const toastConfig = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Slide,
  closeButton: false,
};

export default toastConfig;
