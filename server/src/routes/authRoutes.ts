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
  getMe
 } from '../controllers/authController';
import {  protect  } from '../middlewares/authMiddleware';

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout', protect, logout);
router.post('/mfa/enable', protect, enableMfa);
router.post('/mfa/verify', protect, verifyMfa);
router.get('/sessions', protect, getSessions);
router.delete('/sessions/:id', protect, revokeSession);
router.delete('/sessions', protect, revokeAllSessions);
router.get('/me', protect, getMe);

export default router;
