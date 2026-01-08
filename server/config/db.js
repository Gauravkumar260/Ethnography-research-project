const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Report Recommendation: "Configure timeouts and connection pooling"
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // 1. Give up after 10 seconds of trying to connect (instead of hanging)
      serverSelectionTimeoutMS: 10000, 
      
      // 2. Close sockets after 45 seconds of inactivity to free up resources
      socketTimeoutMS: 45000, 
      
      // 3. Allow up to 10 simultaneous connections (Connection Pooling)
      maxPoolSize: 10, 
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

    // Report Recommendation: "Handle connection errors after initial success"
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB Runtime Error: ${err.message}`.red);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB Disconnected. Attempting to reconnect...'.yellow);
    });

  } catch (error) {
    console.error(`❌ Critical Database Connection Fail: ${error.message}`.red.bold);
    // Exit with failure so your deployment orchestrator (like Docker/Heroku) knows to restart it
    process.exit(1);
  }
};

module.exports = connectDB;