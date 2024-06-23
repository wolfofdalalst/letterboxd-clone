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
userRouter.post('/logout', logoutUser);

userRouter.get('/profile', protect, getUserProfile);
userRouter.post('/profile', protect, addMovieAction);
userRouter.patch('/profile', protect, removeMovieAction);

export default userRouter;
