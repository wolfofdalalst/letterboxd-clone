import apiClient from '@config/apiConfig';

/**
 * MovieService - A service for interacting with the movie-related API endpoints.
 */
const MovieService = {
  /**
   * Fetches the user profile data.
   * @returns {Promise<Object>} - The user profile data.
   * @throws Will throw an error if the request fails.
   */
  userProfile: async () => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Error fetching user details. Please try again.');
    }
  },

  /**
   * Fetches a list of popular movies.
   * @returns {Promise<Array>} - The list of popular movies.
   * @throws Will throw an error if the request fails.
   */
  popularMovies: async () => {
    try {
      const response = await apiClient.get('/movie/popular');
      return response.data;
    } catch (error) {
      console.error('Error getting popular movies:', error);
      throw new Error('Failed to get popular movies. Please try again.');
    }
  },

  /**
   * Fetches details for a specific movie by ID.
   * @param {number|string} id - The ID of the movie to fetch details for.
   * @returns {Promise<Object>} - The details of the specified movie.
   * @throws Will throw an error if the request fails.
   */
  movieDetails: async (id) => {
    try {
      const response = await apiClient.get(`/movie/details/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting movie details:', error);
      throw new Error('Failed to retrieve movie details. Please try again.');
    }
  },
};

export default MovieService;
