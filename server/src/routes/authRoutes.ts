import express from 'express';
const router = express.Router();
import {  
  register, 
  login, 
  refresh, 
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  enableMfa,
  verifyMfa,
  getSessions,
  revokeSession,
  revokeAllSessions,
  getMe,
  magicLink,
  oauthLogin,
  verifyBackupCode
 } from '../controllers/authController';
import {  protect  } from '../middlewares/authMiddleware';
import { rateLimiter } from '../middlewares/rateLimitMiddleware';
import { Profiles } from '../lib/auth/rateLimit';

const getIp = (req: express.Request) => req.ip || req.connection.remoteAddress || 'unknown';

// Public routes
router.post('/register', rateLimiter((req) => Profiles.REGISTER(getIp(req))), register);
router.post('/login', rateLimiter((req) => Profiles.LOGIN_ATTEMPT_IP(getIp(req))), login);
router.post('/refresh', rateLimiter((req) => Profiles.REFRESH(getIp(req))), refresh);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', rateLimiter((req) => Profiles.PASSWORD_RESET_IP(getIp(req))), forgotPassword);
router.post('/reset-password', rateLimiter((req) => Profiles.PASSWORD_RESET_IP(getIp(req))), resetPassword);
router.post('/magic-link', rateLimiter((req) => Profiles.LOGIN_ATTEMPT_IP(getIp(req))), magicLink);
router.post('/oauth/:provider', oauthLogin);

// Protected routes
router.post('/logout', protect, logout);
router.post('/mfa/enable', protect, enableMfa);
router.post('/mfa/verify', protect, rateLimiter((req) => Profiles.MFA_ATTEMPT((req as any).user.id)), verifyMfa);
router.post('/mfa/backup-codes', protect, verifyBackupCode);
router.get('/sessions', protect, getSessions);
router.delete('/sessions/:id', protect, revokeSession);
router.delete('/sessions', protect, revokeAllSessions);
router.get('/me', protect, getMe);

export default router;
