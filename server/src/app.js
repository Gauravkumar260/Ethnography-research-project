const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// --- ROUTES IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes');
const communityRoutes = require('./routes/communityRoutes');
const docRoutes = require('./routes/docRoutes');
const storyRoutes = require('./routes/storyRoutes');
const fieldDataRoutes = require('./routes/fieldDataRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// ==========================================
// 1. MIDDLEWARES (Security & Config)
// ==========================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "https://ethnography-research-project.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app');
    if (isAllowed) return callback(null, true);
    return callback(new Error('CORS blocked'), false);
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// ==========================================
// 2. STATIC FILES & ROUTES
// ==========================================
// Serve uploads from the parent directory (server/uploads)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/docs', docRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/field-data', fieldDataRoutes);

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
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

if (errorHandler) {
  app.use(errorHandler);
}

module.exports = app;