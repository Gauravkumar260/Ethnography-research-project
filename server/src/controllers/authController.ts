// @ts-nocheck
import asyncHandler from 'express-async-handler';
import {  z  } from 'zod';
import User from '../lib/db/models/User';
import EmailVerification from '../lib/db/models/EmailVerification';
import PasswordReset from '../lib/db/models/PasswordReset';
import MfaConfig from '../lib/db/models/MfaConfig';
import Department from '../lib/db/models/Department';
import {  registerSchema, loginSchema  } from '../lib/auth/validations';
import {  
  hashPassword, 
  verifyPassword, 
  checkBreachedPassword, 
  validatePasswordRules 
 } from '../lib/auth/passwords';
import {  
  generateAccessToken, 
  generateEmailToken, 
  generateOtpSecret, 
  verifyOtp,
  generateBackupCodes
 } from '../lib/auth/tokens';
import {  
  createSession, 
  refreshSession, 
  revokeSession,
  revokeAllUserSessions,
  getUserActiveSessions
 } from '../lib/auth/sessions';
import {  checkRateLimit, Profiles  } from '../lib/auth/rateLimit';
import {  scoreLoginRisk  } from '../lib/auth/riskEngine';
import {  logAuthEvent  } from '../lib/auth/audit';
const UAParser = require('ua-parser-js');

import * as crypto from 'crypto';
// Helper to get client IP reliably
const getIp = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress;

// -----------------------------------------------------------------------------
// POST /api/auth/register
// -----------------------------------------------------------------------------
const register = asyncHandler(async (req, res) => {
  const ip = getIp(req);
  
  // 1. Check Rate Limit
  const rl = await checkRateLimit(Profiles.REGISTER(ip).key, Profiles.REGISTER(ip).max, Profiles.REGISTER(ip).window);
  if (!rl.allowed) {
    return res.status(429).json({ message: 'Too many registration attempts. Try again later.' });
  }

  // 2. Validate Input
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }
  const { name, email, password, role, departmentId } = parsed.data;

  // 3. Check existing user
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    // Avoid user enumeration: Send success message anyway (or generic error)
    return res.status(200).json({ message: 'If the email is valid, a verification link has been sent.' });
  }

  // 4. Validate Password Strength & Breaches
  if (!validatePasswordRules(password)) {
    return res.status(400).json({ message: 'Password does not meet complexity requirements.' });
  }
  const isBreached = await checkBreachedPassword(password);
  if (isBreached) {
    return res.status(400).json({ message: 'Password has appeared in a data breach. Please choose another.' });
  }

  // 5. Hash & Create
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    passwordHash: hashedPassword,
    role,
    departmentId
  });

  // 6. Generate Verification Token
  const { token, hash } = generateEmailToken();
  await EmailVerification.create({
    userId: user._id,
    tokenHash: hash,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });

  // TODO: Send Email (Integrate Resend here)
  console.log(`[DEV] Verification Token for ${email}: ${token}`);

  // 7. Audit Log
  await logAuthEvent({
    userId: user._id,
    eventType: 'REGISTER',
    ipAddress: ip,
    userAgent: req.headers['user-agent'],
    success: true
  });

  res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
});

// -----------------------------------------------------------------------------
// POST /api/auth/login
// -----------------------------------------------------------------------------
const login = asyncHandler(async (req, res) => {
  const ip = getIp(req);
  const ua = req.headers['user-agent'];
  
  // 1. Validate Input
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }
  const { email, password, mfaToken, deviceFingerprint } = parsed.data;

  // 2. Check IP Rate Limit
  const rlIp = await checkRateLimit(Profiles.LOGIN_ATTEMPT_IP(ip).key, Profiles.LOGIN_ATTEMPT_IP(ip).max, Profiles.LOGIN_ATTEMPT_IP(ip).window);
  if (!rlIp.allowed) return res.status(429).json({ message: 'Too many attempts from this IP.' });

  // 3. Find User
  const user = await User.findOne({ email: email.toLowerCase() });
  console.log('User found in login:', !!user);
  
  // Mitigate timing attacks: always verify a dummy password if user not found
  if (!user) {
    await verifyPassword('$argon2id$v=19$m=65536,t=3,p=4$dummy$dummy', password);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 4. Check User Rate Limit (Email)
  const rlEmail = await checkRateLimit(Profiles.LOGIN_ATTEMPT_EMAIL(email).key, Profiles.LOGIN_ATTEMPT_EMAIL(email).max, Profiles.LOGIN_ATTEMPT_EMAIL(email).window);
  if (!rlEmail.allowed) return res.status(429).json({ message: 'Too many attempts for this account.' });

  // 5. Check Lockout Status
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(403).json({ message: 'Account is temporarily locked. Try again later.' });
  }
  if (!user.isActive || user.isBanned) {
    return res.status(403).json({ message: 'Account disabled.' });
  }

  // 6. Verify Password
  const isValid = await verifyPassword(user.passwordHash, password);
  console.log('Password is valid:', isValid);
  if (!isValid) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 mins
      await logAuthEvent({ userId: user._id, eventType: 'ACCOUNT_LOCKED', ipAddress: ip, userAgent: ua, success: true });
    }
    await user.save();
    
    await logAuthEvent({ userId: user._id, eventType: 'LOGIN_FAILED', ipAddress: ip, userAgent: ua, success: false });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Success path resets failed attempts
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  await user.save();

  // 7. Check Email Verification
  if (!user.emailVerified) {
    return res.status(403).json({ message: 'Please verify your email address first.', requiresEmailVerification: true });
  }

  // 8. Risk Scoring & MFA Check
  const riskScore = await scoreLoginRisk(user._id, ip, ua, deviceFingerprint);
  const mfaConfig = await MfaConfig.findOne({ userId: user._id, isEnabled: true });

  if (mfaConfig) {
    if (!mfaToken) {
      return res.status(200).json({ requiresMfa: true, message: 'MFA token required' });
    }
    // Verify TOTP
    const isValidOtp = verifyOtp(mfaConfig.secret, mfaToken);
    if (!isValidOtp) {
      // TODO: Add Backup code check logic here
      return res.status(401).json({ message: 'Invalid MFA code' });
    }
  } else if (riskScore >= 0.6) {
    // High risk, no MFA setup -> Force additional verification (e.g. Email OTP)
    // For now, we'll just log and maybe block if > 0.8
    if (riskScore >= 0.8) {
      await logAuthEvent({ userId: user._id, eventType: 'SUSPICIOUS_ACTIVITY', ipAddress: ip, userAgent: ua, success: false, riskScore });
      return res.status(403).json({ message: 'Suspicious login attempt blocked.' });
    }
  }

  // 9. Create Session
  const parser = new UAParser(ua);
  const deviceInfo = {
    browser: parser.getBrowser().name || 'Unknown Browser',
    os: parser.getOS().name || 'Unknown OS',
    deviceType: parser.getDevice().type || 'desktop'
  };

  const { session, refreshToken } = await createSession(user._id, deviceInfo, ip, ua);
  
  // 10. Generate Access Token
  const accessToken = generateAccessToken({ 
    sub: user._id, 
    role: user.role, 
    sessionId: session._id 
  });

  user.lastLoginAt = new Date();
  user.lastLoginIp = ip;
  await user.save();

  await logAuthEvent({ userId: user._id, eventType: 'LOGIN_SUCCESS', ipAddress: ip, userAgent: ua, success: true, riskScore });

  // 11. Set Refresh Token Cookie
  res.cookie('__rt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.status(200).json({
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// -----------------------------------------------------------------------------
// POST /api/auth/refresh
// -----------------------------------------------------------------------------
const refresh = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.__rt;
  if (!oldRefreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  const ip = getIp(req);
  const ua = req.headers['user-agent'];
  const parser = new UAParser(ua);
  const deviceInfo = {
    browser: parser.getBrowser().name || 'Unknown Browser',
    os: parser.getOS().name || 'Unknown OS',
    deviceType: parser.getDevice().type || 'desktop'
  };

  const result = await refreshSession(oldRefreshToken, deviceInfo, ip, ua);
  
  if (!result) {
    // Reuse detected or expired
    res.clearCookie('__rt');
    // TODO: If we had a way to identify the user here without the token, we'd revoke all sessions.
    return res.status(401).json({ message: 'Invalid refresh token. Please log in again.' });
  }

  res.cookie('__rt', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({ accessToken: result.accessToken });
});

// -----------------------------------------------------------------------------
// POST /api/auth/logout
// -----------------------------------------------------------------------------
const logout = asyncHandler(async (req, res) => {
  if (req.session) {
    await revokeSession(req.session._id);
    await logAuthEvent({ 
      userId: req.user._id, 
      eventType: 'LOGOUT', 
      ipAddress: getIp(req), 
      userAgent: req.headers['user-agent'], 
      success: true 
    });
  }
  
  res.clearCookie('__rt');
  res.status(200).json({ message: 'Logged out successfully' });
});

// -----------------------------------------------------------------------------
// POST /api/auth/verify-email
// -----------------------------------------------------------------------------
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  const hash = crypto.createHash('sha256').update(token).digest('hex');

  const verification = await EmailVerification.findOne({ tokenHash: hash });
  if (!verification) return res.status(400).json({ message: 'Invalid token' });
  if (verification.expiresAt < new Date()) return res.status(400).json({ message: 'Token expired' });
  if (verification.usedAt) return res.status(400).json({ message: 'Token already used' });

  verification.usedAt = new Date();
  await verification.save();

  await User.findByIdAndUpdate(verification.userId, { emailVerified: true, emailVerifiedAt: new Date() });

  await logAuthEvent({ userId: verification.userId, eventType: 'EMAIL_VERIFIED', ipAddress: getIp(req), userAgent: req.headers['user-agent'], success: true });

  res.status(200).json({ message: 'Email verified' });
});

// -----------------------------------------------------------------------------
// POST /api/auth/forgot-password
// -----------------------------------------------------------------------------
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const ip = getIp(req);
  const rl = await checkRateLimit(Profiles.PASSWORD_RESET(email).key, Profiles.PASSWORD_RESET(email).max, Profiles.PASSWORD_RESET(email).window);
  if (!rl.allowed) return res.status(429).json({ message: 'Too many requests. Try again later.' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(200).json({ message: 'If that email exists, a reset link was sent' });
  }

  const { token, hash } = generateEmailToken();
  await PasswordReset.updateMany({ userId: user._id, usedAt: null }, { usedAt: new Date() }); // Invalidate old

  await PasswordReset.create({
    userId: user._id,
    tokenHash: hash,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    ipAddress: ip
  });

  // TODO: Send email
  console.log(`[DEV] Password Reset Token for ${email}: ${token}`);

  res.status(200).json({ message: 'If that email exists, a reset link was sent' });
});

// -----------------------------------------------------------------------------
// POST /api/auth/reset-password
// -----------------------------------------------------------------------------
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' });

  const hash = crypto.createHash('sha256').update(token).digest('hex');

  const resetReq = await PasswordReset.findOne({ tokenHash: hash });
  if (!resetReq) return res.status(400).json({ message: 'Invalid token' });
  if (resetReq.expiresAt < new Date()) return res.status(400).json({ message: 'Token expired' });
  if (resetReq.usedAt) return res.status(400).json({ message: 'Token already used' });

  if (!validatePasswordRules(newPassword)) return res.status(400).json({ message: 'Password does not meet complexity requirements.' });
  const isBreached = await checkBreachedPassword(newPassword);
  if (isBreached) return res.status(400).json({ message: 'Password has appeared in a data breach. Please choose another.' });

  const user = await User.findById(resetReq.userId);
  const isSame = await verifyPassword(user.passwordHash, newPassword);
  if (isSame) return res.status(400).json({ message: 'New password cannot be the same as the old one' });

  user.passwordHash = await hashPassword(newPassword);
  user.mustChangePwd = false;
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  await user.save();

  resetReq.usedAt = new Date();
  await resetReq.save();

  await revokeAllUserSessions(user._id);

  await logAuthEvent({ userId: user._id, eventType: 'PASSWORD_RESET', ipAddress: getIp(req), userAgent: req.headers['user-agent'], success: true });

  res.status(200).json({ message: 'Password updated. Please log in.' });
});

// -----------------------------------------------------------------------------
// POST /api/auth/mfa/enable
// -----------------------------------------------------------------------------
const enableMfa = asyncHandler(async (req, res) => {
  const secret = generateOtpSecret();
  const { codes, hashes } = await generateBackupCodes(8);
  
  const mfaConfig = await MfaConfig.findOne({ userId: req.user._id });
  if (mfaConfig && mfaConfig.isEnabled) {
    return res.status(400).json({ message: 'MFA is already enabled' });
  }

  // Not saving to DB yet, wait for verification
  // We can temporarily store it or have the client send it back on verify (encrypted)
  // For simplicity here, we'll return it. In a real app, store it with isEnabled: false
  await MfaConfig.findOneAndUpdate(
    { userId: req.user._id },
    {
      secret, // In real app, encrypt this AES-256-GCM
      method: 'TOTP',
      isEnabled: false,
      backupCodes: hashes.map(h => ({ codeHash: h, isUsed: false }))
    },
    { upsert: true }
  );

  const qrCodeUrl = `otpauth://totp/UnheardIndia:${req.user.email}?secret=${secret}&issuer=UnheardIndia`;

  res.status(200).json({ secret, qrCodeUrl, backupCodes: codes });
});

// -----------------------------------------------------------------------------
// POST /api/auth/mfa/verify
// -----------------------------------------------------------------------------
const verifyMfa = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  const mfaConfig = await MfaConfig.findOne({ userId: req.user._id });
  if (!mfaConfig) return res.status(400).json({ message: 'MFA setup not initiated' });

  const isValid = verifyOtp(mfaConfig.secret, token); // Remember to decrypt if encrypted
  if (!isValid) return res.status(400).json({ message: 'Invalid code' });

  mfaConfig.isEnabled = true;
  mfaConfig.enabledAt = new Date();
  await mfaConfig.save();

  await logAuthEvent({ userId: req.user._id, eventType: 'MFA_ENABLED', ipAddress: getIp(req), userAgent: req.headers['user-agent'], success: true });

  res.status(200).json({ success: true, message: 'MFA enabled successfully' });
});

// -----------------------------------------------------------------------------
// GET /api/auth/sessions
// -----------------------------------------------------------------------------
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await getUserActiveSessions(req.user._id);
  // Add isCurrent flag
  const formatted = sessions.map(s => ({
    ...s,
    isCurrent: req.session && s.id === req.session._id.toString()
  }));
  res.status(200).json({ sessions: formatted });
});

// -----------------------------------------------------------------------------
// DELETE /api/auth/sessions/:id
// -----------------------------------------------------------------------------
const revokeSessionHandler = asyncHandler(async (req, res) => { // Renamed to avoid shadowing
  const { id } = req.params;
  // TODO: Verify session belongs to user
  await revokeSession(id);
  await logAuthEvent({ userId: req.user._id, eventType: 'SESSION_REVOKED', ipAddress: getIp(req), userAgent: req.headers['user-agent'], success: true, metadata: { sessionId: id } });
  res.status(200).json({ message: 'Session revoked' });
});

// -----------------------------------------------------------------------------
// DELETE /api/auth/sessions
// -----------------------------------------------------------------------------
const revokeAllSessionsHandler = asyncHandler(async (req, res) => {
  await revokeAllUserSessions(req.user._id, req.session ? req.session._id : undefined);
  await logAuthEvent({ userId: req.user._id, eventType: 'SESSION_REVOKED', ipAddress: getIp(req), userAgent: req.headers['user-agent'], success: true, metadata: { all: true } });
  res.status(200).json({ message: 'All other sessions revoked' });
});

// -----------------------------------------------------------------------------
// GET /api/auth/me
// -----------------------------------------------------------------------------
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user.toSafeObject() });
});

export { 
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
  revokeSessionHandler as revokeSession,
  revokeAllSessionsHandler as revokeAllSessions,
  getMe
 };
