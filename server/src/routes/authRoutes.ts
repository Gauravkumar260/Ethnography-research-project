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

// Public routes
router.post('/register', rateLimiter((req) => Profiles.REGISTER(req.ip!)), register);
router.post('/login', rateLimiter((req) => Profiles.LOGIN_ATTEMPT_IP(req.ip!)), login);
router.post('/refresh', rateLimiter((req) => Profiles.REFRESH(req.ip!)), refresh);

// Root Cause Fix: Added rate limiting to verification and reset routes
router.post('/verify-email', rateLimiter((req) => Profiles.REGISTER(req.ip!)), verifyEmail);
router.post('/forgot-password', rateLimiter((req) => Profiles.PASSWORD_RESET_IP(req.ip!)), forgotPassword);
router.post('/reset-password', rateLimiter((req) => Profiles.PASSWORD_RESET_IP(req.ip!)), resetPassword);

router.post('/magic-link', rateLimiter((req) => Profiles.LOGIN_ATTEMPT_IP(req.ip!)), magicLink);
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
