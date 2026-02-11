const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const path = require('path');

// --- SECURITY IMPORTS ---
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// --- DATABASE ---
const connectDB = require('./config/db');

// --- ROUTES IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes');
const communityRoutes = require('./routes/communityRoutes');
const docRoutes = require('./routes/docRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

// --- DEBUGGING CHECKS ---
console.log("------------------------------------------------");
console.log("Auth Routes:      ", authRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Research Routes:  ", researchRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Community Routes: ", communityRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Doc Routes:       ", docRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Error Handler:    ", errorHandler ? "✅ Loaded" : "❌ FAILED");
console.log("------------------------------------------------");

const startServer = async () => {
  try {
    dotenv.config();
    await connectDB();  // Wait for DB before starting server

    const app = express();

    // ==========================================
    // 1. MIDDLEWARES (Security & Config)
    // ==========================================

    // A. Security Headers
    app.use(helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" } // Allows images/videos to load
    }));

    // B. CORS Configuration
    const allowedOrigins = [
      "http://localhost:3000",      // Local Frontend
      "http://localhost:5173",      // Vite
      "http://127.0.0.1:3000",
      "https://ethnography-research-project.vercel.app",
      process.env.CLIENT_URL        // Production URL
    ].filter(Boolean);

    app.use(cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin is in the allowed list OR is a vercel preview deployment
        const isAllowed = allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app');

        if (isAllowed) {
          return callback(null, true);
        } else {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
      },
      credentials: true
    }));

    // C. Parsers
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: false }));

    // D. Data Sanitization
    app.use(mongoSanitize()); // Prevent NoSQL Injection
    app.use(xss());           // Prevent XSS
    app.use(hpp());           // Prevent Parameter Pollution

    // ==========================================
    // 2. STATIC FILES & ROUTES
    // ==========================================

    // Serve uploaded images/videos
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/research', researchRoutes);
    app.use('/api/communities', communityRoutes);
    app.use('/api/docs', docRoutes);

    // Health Check
    app.get('/', (req, res) => {
      res.json({
        message: 'Unheard India API is running...',
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });

    // ==========================================
    // 3. ERROR HANDLING
    // ==========================================

    // 404 Handler (From your old code - Good to have!)
    app.use((req, res, next) => {
      const error = new Error(`Not Found - ${req.originalUrl}`);
      res.status(404);
      next(error);
    });

    // Global Error Handler
    if (errorHandler) {
      app.use(errorHandler);
    }

    // ==========================================
    // 4. STARTUP
    // ==========================================
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