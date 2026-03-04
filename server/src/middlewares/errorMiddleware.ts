// @ts-nocheck
import 'colors';
const errorHandler = (err, req, res, next) => {
  // console.error('Error Stack:', err.stack); // Use for deep debugging

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  // 1. Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // 2. Mongoose Duplicate Key
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  // 3. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }

  // 4. JWT Invalid Token
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  // 5. JWT Expired Token
  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  // 6. Multer Errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large. Max allowed is 1GB for datasets and 50MB for documents.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = `Unexpected field: ${err.field}. Please check the upload documentation.`;
    } else {
      message = `Upload Error: ${err.message}`;
    }
  }

  // 7. Generic Error: If it contains "Invalid file type", return 400
  if (err.message && (err.message.includes('Invalid file type') || err.message.includes('Only PDF'))) {
    statusCode = 400;
  }

  console.error(`Error (${statusCode}):`.red, message);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

// ✅ CORRECT EXPORT for your server.js
export {  errorHandler  };