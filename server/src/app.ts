import { config } from './config/env';
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

// --- ROUTES IMPORTS ---
import authRoutes from './routes/authRoutes';
import researchRoutes from './routes/researchRoutes';
import communityRoutes from './routes/communityRoutes';
import docRoutes from './routes/docRoutes';
import storyRoutes from './routes/storyRoutes';
import fieldDataRoutes from './routes/fieldDataRoutes';
import {  errorHandler  } from './middlewares/errorMiddleware';

import { v4 as uuidv4 } from 'uuid';

const app = express();

// Correlation ID for distributed tracing and audit logs
app.use((req: any, res, next) => {
  req.correlationId = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-ID', req.correlationId);
  next();
});

import csurf from 'csurf';

// ==========================================
// 1. MIDDLEWARES (Security & Config)
// ==========================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.pwnedpasswords.com"],
      imgSrc: ["'self'", "data:", "https://resend.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    }
  }
}));

// Permissions-Policy needs to be set manually
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "https://ethnography-research-project.vercel.app",
  config.CLIENT_URL
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
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// CSRF Protection
const csrfProtection = csurf({ 
  cookie: {
    key: '_csrf',
    path: '/',
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict'
  } 
});

// Provide CSRF token to frontend
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Apply CSRF to mutating routes
const mutateMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
app.use((req, res, next) => {
  if (mutateMethods.includes(req.method)) {
    return csrfProtection(req, res, next);
  }
  next();
});

// ==========================================
// 2. STATIC FILES & ROUTES
// ==========================================
// Static files route removed for security (files stored outside web root)

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

export default app;