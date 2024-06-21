import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: false,
    secure: true,
    sameSite: 'None',
  });
};

export default generateToken;
