import { config } from './env';
import { logger } from '../lib/logger';
import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI = config.MONGODB_URI;

  if (!MONGO_URI) {
    logger.error('MONGO_URI is not defined in config');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 100,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB Runtime Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB Disconnected. Attempting to reconnect...');
    });

  } catch (error: any) {
    logger.error(`Critical Database Connection Fail: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
