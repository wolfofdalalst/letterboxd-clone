import { Router } from 'express';

import {
  addMovieAction,
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  removeMovieAction,
} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.post('/', registerUser);
userRouter.post('/auth', authUser);
userRouter.post('/logout', protect, logoutUser);

userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .post(protect, addMovieAction)
  .patch(protect, removeMovieAction);

export default userRouter;
