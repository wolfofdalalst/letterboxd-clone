/**
 * Middleware to handle routes that are not found.
 * Sets the response status to 404 and forwards an error message.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Generic error-handling middleware.
 * Sets the response code and sends JSON response with error message.
 */
const errorHandler = (error, req, res, next) => {
  // Default to 500 if status code is not set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  // Handle mongoose not found error
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export { notFound, errorHandler };
