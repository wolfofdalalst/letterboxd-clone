import axios from 'axios';

// Axios API client with set configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
