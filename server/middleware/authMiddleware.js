import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to protect routes by checking for valid JWT token in cookies \
 * Stores the user data in `req.user` object
 */
const protect = expressAsyncHandler(async (req, res, next) => {
  // Retrieve token from cookies
  let token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify the token and extract the user ID
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and exclude the password field
    req.user = await User.findById(userId).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export default protect;
