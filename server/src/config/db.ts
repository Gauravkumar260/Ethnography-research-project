import mongoose from 'mongoose';
import 'colors';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error('❌ MONGO_URI or MONGODB_URI is not defined'.red.bold);
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000, 
      maxPoolSize: 10, 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB Runtime Error: ${err.message}`.red);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB Disconnected. Attempting to reconnect...'.yellow);
    });

  } catch (error: any) {
    console.error(`❌ Critical Database Connection Fail: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
