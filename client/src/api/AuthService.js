import apiClient from '../config/apiConfig';

/**
 * AuthService module to handle authentication related API calls.
 */
const AuthService = {
  /**
   * Logs in the user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The response data from the API.
   * @throws Will throw an error if the login fails.
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/user/auth', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error(
        'Login failed. Please check your credentials and try again.'
      );
    }
  },

  /**
   * Logs out the user.
   * @returns {Promise<Object>} The response data from the API.
   * @throws Will throw an error if the logout fails.
   */
  logout: async () => {
    try {
      const response = await apiClient.post('/user/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Logout failed. Please try again.');
    }
  },

  /**
   * Registers a new user.
   * @param {string} name - The user's name.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Object>} The response data from the API.
   * @throws Will throw an error if the registration fails.
   */
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/user', { name, email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Registration failed. Please try again.');
    }
  },
};

export default AuthService;
