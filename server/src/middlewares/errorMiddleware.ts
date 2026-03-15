import { logger } from '../lib/logger';
import 'colors';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  if (err.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors as Record<string, any>).map((val: any) => val.message).join(', ');
    statusCode = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

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

  if (err.message && (err.message.includes('Invalid file type') || err.message.includes('Only PDF'))) {
    statusCode = 400;
  }

  logger.error(`Error (${statusCode}):`.red, message);

  // Never leak stack traces to the client
  res.status(statusCode).json({
    success: false,
    message,
    correlationId: (req as any).correlationId || req.headers['x-request-id'] || 'unknown'
  });
};

export { errorHandler };