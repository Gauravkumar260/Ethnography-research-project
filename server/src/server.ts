import { config } from './config/env';
import { logger } from './lib/logger';
import dotenv from 'dotenv';
import 'colors';
import otelSDK from './lib/otel';     
import connectDB from './config/db';  
import app from './app';

// Initialize OTEL before anything else
otelSDK.start();

// Load environment variables
dotenv.config({ path: '../.env' }); // Adjust path if .env is in server root

const startServer = async () => {
  try {
    await connectDB();  // Wait for DB before starting server

    const PORT = config.PORT || 5000;
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`.yellow.bold);
    });

    // Root Cause Fix: Removed excessive 1-hour timeout which enabled DoS.
    // Rely on default Node.js timeouts and Multer per-route limits.

  } catch (error) {
    logger.error('Failed to start server:'.red, error.message);
    process.exit(1);
  }
};

startServer();
