import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { compare } from 'bcrypt';

/**
 * Resgister a new user
 * @route POST /users/register
 * @access Public
 */
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

/**
 * Authenticate user and get token
 * @route POST /user/auth
 * @access Public
 */
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Authentication error');
  }
});

/**
 * Logout user
 * @route POST /user/logout
 * @access Private
 */
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

/**
 * Return user profile
 * @route GET /user/profile
 * @access Private
 */
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Add a movie action to user's list (liked, watched, watchlist)
 * @route POST /user/profile
 * @access Private
 */
const addMovieAction = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new Error('User does not exists');
  }

  const { liked, watched, watchlist } = req.body;

  if (liked !== undefined) user.liked.unshift(liked);
  if (watched !== undefined) user.watched.unshift(watched);
  if (watchlist !== undefined) user.watchlist.unshift(watchlist);

  await user.save();

  res.json({
    liked: user.liked,
    watched: user.watched,
    watchlist: user.watchlist,
  });
});

/**
 * Remove a movie action from user's list (liked, watched, watchlist)
 * @route PATCH /movie/profile
 * @access Private
 */
const removeMovieAction = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new Error('User does not exists');
  }

  const { liked, watched, watchlist } = req.body;

  if (liked !== undefined)
    user.liked = user.liked.filter((item) => item !== liked);
  if (watched !== undefined)
    user.watched = user.watched.filter((item) => item !== watched);
  if (watchlist !== undefined)
    user.watchlist = user.watchlist.filter((item) => item !== watchlist);

  await user.save();

  res.json({
    liked: user.liked,
    watched: user.watched,
    watchlist: user.watchlist,
  });
});

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  addMovieAction,
  removeMovieAction,
};
