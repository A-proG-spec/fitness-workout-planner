const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'CastError') {
    error = { statusCode: 404, message: 'Resource not found' };
  }

  if (err.code === 11000) {
    error = { statusCode: 400, message: 'Duplicate field value entered' };
  }

  if (err.name === 'ValidationError' && !err.isJoi) {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { statusCode: 400, message };
  }

  if (err.name === 'ValidationError' && err.isJoi) {
    const message = err.details.map(detail => detail.message).join(', ');
    error = { statusCode: 400, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;