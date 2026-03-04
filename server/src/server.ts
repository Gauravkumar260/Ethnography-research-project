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

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold);
    });

    // Increase timeout for large file uploads (e.g., 5GB could take 30+ minutes)
    server.timeout = 3600000; // 1 hour

  } catch (error) {
    console.error('Failed to start server:'.red, error.message);
    process.exit(1);
  }
};

startServer();