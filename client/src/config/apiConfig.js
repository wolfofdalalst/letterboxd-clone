import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
