import { Router } from 'express';
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.post('/', registerUser);
userRouter.post('/auth', authUser);
userRouter.post('/logout', logoutUser);

userRouter.get('/profile', protect, getUserProfile);

export default userRouter;
