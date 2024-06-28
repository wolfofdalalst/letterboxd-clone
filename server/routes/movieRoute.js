import { Router } from 'express';
import {
  movieDetail,
  popularMovies,
  searchMovies,
} from '../controller/movieController.js';
import protect from '../middleware/authMiddleware.js';

const movieRouter = Router();

// Protect all the routes with authentication middleware
movieRouter.use(protect);

movieRouter.get('/popular', popularMovies);
movieRouter.get('/search/:name', searchMovies);
movieRouter.get('/details/:id', movieDetail);

export default movieRouter;
