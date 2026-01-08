const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
// --- SECURITY IMPORTS (Issue #4 Fixes) ---
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
// -----------------------------------------
const connectDB = require('./config/db');

// --- DEBUGGING IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes'); 
const communityRoutes = require('./routes/communityRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

console.log("------------------------------------------------");
console.log("Auth Routes:      ", authRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Research Routes:  ", researchRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Community Routes: ", communityRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Error Handler:    ", errorHandler ? "✅ Loaded" : "❌ FAILED");
console.log("------------------------------------------------");

const startServer = async () => {
  try {
    dotenv.config();
    await connectDB();  // ✅ Wait for database connection
    
    const app = express();

    // ==========================================
    // 2. Middlewares (Secured)
    // ==========================================

    // A. Security Headers (Helmet)
    // Fixes "Security Headers Missing" vulnerability
    app.use(helmet());

    // B. Robust CORS Configuration
    const allowedOrigins = [
      "http://localhost:3000",      // React (Create React App)
      "http://localhost:5173",      // React (Vite)
      "http://127.0.0.1:3000",      // Localhost IP variant
      process.env.CLIENT_URL        // Production URL
    ].filter(Boolean);

    app.use(cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true
    }));

    // C. Body Parsers with Limits
    // Prevents DoS attacks by limiting body size
    app.use(express.json({ limit: '10kb' })); 
    app.use(express.urlencoded({ extended: false }));

    // D. Data Sanitization (The "Bodyguards")
    // 1. Prevent NoSQL Injection (removes '$' and '.')
    app.use(mongoSanitize());

    // 2. Prevent XSS Attacks (cleans malicious HTML)
    app.use(xss());

    // 3. Prevent Parameter Pollution
    app.use(hpp());

    // ==========================================
    // 3. Static Assets & Routes
    // ==========================================
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.use('/api/auth', authRoutes);
    app.use('/api/research', researchRoutes);
    app.use('/api/communities', communityRoutes);

    app.get('/', (req, res) => {
      res.json({ message: 'Unheard India API is running (Secured)...' });
    });

    // 4. Error Handling
    if (errorHandler) {
        app.use(errorHandler);
    } else {
        console.log("WARNING: errorHandler is not loaded correctly.".red);
    }

    // 5. Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold);
    });

  } catch (error) {
    console.error('Failed to start server:'.red, error.message);
    process.exit(1);
  }
};

startServer();