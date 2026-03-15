import { config } from '../config/env';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import User from '../lib/db/models/User';
import EmailVerification from '../lib/db/models/EmailVerification';
import PasswordReset from '../lib/db/models/PasswordReset';
import MfaConfig from '../lib/db/models/MfaConfig';
import Department from '../lib/db/models/Department';
import { registerSchema, loginSchema } from '../lib/auth/validations';
import { hashPassword, verifyPassword, checkBreachedPassword, validatePasswordRules } from '../lib/auth/passwords';
import { generateAccessToken, generateEmailToken, generateOtpSecret, verifyOtp, generateBackupCodes } from '../lib/auth/tokens';
import { createSession, refreshSession, revokeSession as revokeAuthSession, revokeAllUserSessions, getUserActiveSessions } from '../lib/auth/sessions';
import { checkRateLimit, Profiles, redis } from '../lib/auth/rateLimit';
import { scoreLoginRisk } from '../lib/auth/riskEngine';
import { logAuthEvent } from '../lib/auth/audit';
const UAParser = require('ua-parser-js');

import * as crypto from 'crypto';
import * as React from 'react';
import mongoose from 'mongoose';
import { sendEmail } from '../lib/email/sender';
import { VerifyEmailTemplate } from '../lib/email/templates/verify-email';
import { ResetPasswordTemplate } from '../lib/email/templates/reset-password';

const getIp = (req: Request) => (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1') as string;

export const register = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const ip = getIp(req);
  const rl = await checkRateLimit(Profiles.REGISTER(ip).key, Profiles.REGISTER(ip).max, Profiles.REGISTER(ip).window);
  if (!rl.allowed) return res.status(429).json({ message: 'Too many registration attempts. Try again later.' });

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });

  const { name, email, password, role, departmentId } = parsed.data;

  const department = await Department.findById(departmentId);
  if (!department) return res.status(400).json({ message: 'Invalid department' });
  const emailDomain = email.split('@')[1];
  if (emailDomain !== department.institutionDomain) {
    return res.status(400).json({ message: `Email domain must match institution domain: ${department.institutionDomain}` });
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) return res.status(200).json({ message: 'If the email is valid, a verification link has been sent.' });

  if (!validatePasswordRules(password)) return res.status(400).json({ message: 'Password does not meet complexity requirements.' });
  const isBreached = await checkBreachedPassword(password);
  if (isBreached) return res.status(400).json({ message: 'Password has appeared in a data breach. Please choose another.' });

  const hashedPassword = await hashPassword(password);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const [user] = await User.create([{ fullName: name, email, passwordHash: hashedPassword, role, departmentId }], { session });
    const { token, hash } = generateEmailToken();
    await EmailVerification.create([{ userId: user._id, tokenHash: hash, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) }], { session });
    await session.commitTransaction();

    const verificationUrl = `${config.CLIENT_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;
    sendEmail({ to: email, subject: 'Verify your account', template: React.createElement(VerifyEmailTemplate, { url: verificationUrl }) });
    await logAuthEvent({ userId: user._id, eventType: 'REGISTER', ipAddress: ip, userAgent: req.headers['user-agent'] || '', success: true });
    res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const ip = getIp(req);
  const ua = req.headers['user-agent'] || '';

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.format() });
  const { email, password, mfaToken, deviceFingerprint } = parsed.data;

  const rlIp = await checkRateLimit(Profiles.LOGIN_ATTEMPT_IP(ip).key, Profiles.LOGIN_ATTEMPT_IP(ip).max, Profiles.LOGIN_ATTEMPT_IP(ip).window);
  if (!rlIp.allowed) return res.status(429).json({ message: 'Too many attempts from this IP.' });

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    await verifyPassword('$argon2id$v=19$m=65536,t=3,p=4$dummy$dummy', password);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const rlEmail = await checkRateLimit(Profiles.LOGIN_ATTEMPT_EMAIL(email).key, Profiles.LOGIN_ATTEMPT_EMAIL(email).max, Profiles.LOGIN_ATTEMPT_EMAIL(email).window);
  if (!rlEmail.allowed) return res.status(429).json({ message: 'Too many attempts for this account.' });

  if (user.lockedUntil && user.lockedUntil > new Date()) return res.status(403).json({ message: 'Account is temporarily locked. Try again later.' });
  if (!user.isActive || user.isBanned) return res.status(403).json({ message: 'Account disabled.' });

  const isValid = await verifyPassword(user.passwordHash || '', password);
  if (!isValid) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      await logAuthEvent({ userId: user._id, eventType: 'ACCOUNT_LOCKED', ipAddress: ip, userAgent: ua, success: true });
    }
    await user.save();
    await logAuthEvent({ userId: user._id, eventType: 'LOGIN_FAILED', ipAddress: ip, userAgent: ua, success: false });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  await user.save();

  if (!user.emailVerified) return res.status(403).json({ message: 'Please verify your email address first.', requiresEmailVerification: true });

  const riskScoreData = await scoreLoginRisk(user._id, ip, ua, deviceFingerprint || '');
  const mfaConfig = await MfaConfig.findOne({ userId: user._id, isEnabled: true });

  if (mfaConfig) {
    if (!mfaToken) return res.status(200).json({ requiresMfa: true, message: 'MFA token required' });
    const isValidOtp = verifyOtp(mfaConfig.secret, mfaToken);
    if (!isValidOtp) return res.status(401).json({ message: 'Invalid MFA code' });
  } else if (riskScoreData.score >= 0.6) {
    if (riskScoreData.score >= 0.8) {
      await logAuthEvent({ userId: user._id, eventType: 'SUSPICIOUS_ACTIVITY', ipAddress: ip, userAgent: ua, success: false, riskScore: riskScoreData.score });
      return res.status(403).json({ message: 'Suspicious login attempt blocked.' });
    }
  }

  const parser = new UAParser(ua);
  const deviceInfo = { browser: parser.getBrowser().name || 'Unknown Browser', os: parser.getOS().name || 'Unknown OS', deviceType: parser.getDevice().type || 'desktop' };

  const { session, refreshToken } = await createSession(user._id, deviceInfo as any, ip, ua);
  const accessToken = generateAccessToken({ sub: user._id.toString(), role: user.role, sessionId: session._id.toString() });

  user.lastLoginAt = new Date();
  user.lastLoginIp = ip;
  await user.save();

  await logAuthEvent({ userId: user._id, eventType: 'LOGIN_SUCCESS', ipAddress: ip, userAgent: ua, success: true, riskScore: riskScoreData.score });

  res.cookie('__rt', refreshToken, { httpOnly: true, secure: config.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(200).json({ accessToken, user: user.toSafeObject() });
});

export const refresh = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const oldRefreshToken = req.cookies.__rt;
  if (!oldRefreshToken) return res.status(401).json({ message: 'No refresh token provided' });

  const ip = getIp(req);
  const ua = req.headers['user-agent'] || '';
  const parser = new UAParser(ua);
  const deviceInfo = { browser: parser.getBrowser().name || 'Unknown Browser', os: parser.getOS().name || 'Unknown OS', deviceType: parser.getDevice().type || 'desktop' };

  const result = await refreshSession(oldRefreshToken, deviceInfo as any, ip, ua);

  if (!result) {
    res.clearCookie('__rt');
    return res.status(401).json({ message: 'Invalid refresh token. Please log in again.' });
  }

  res.cookie('__rt', result.refreshToken, { httpOnly: true, secure: config.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(200).json({ accessToken: result.accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  if ((req as any).session) {
    await revokeAuthSession((req as any).session._id);
    await logAuthEvent({ userId: (req as any).user._id, eventType: 'LOGOUT', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true });
  }
  res.clearCookie('__rt');
  res.status(200).json({ message: 'Logged out successfully' });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<any> => {
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
  await logAuthEvent({ userId: verification.userId, eventType: 'EMAIL_VERIFIED', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true });
  res.status(200).json({ message: 'Email verified' });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const ip = getIp(req);
  const rl = await checkRateLimit(Profiles.PASSWORD_RESET(email).key, Profiles.PASSWORD_RESET(email).max, Profiles.PASSWORD_RESET(email).window);
  if (!rl.allowed) return res.status(429).json({ message: 'Too many requests' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(200).json({ message: 'If that email exists, a reset link was sent' });

  const { token, hash } = generateEmailToken();
  await PasswordReset.updateMany({ userId: user._id, usedAt: null }, { usedAt: new Date() });
  await PasswordReset.create({ userId: user._id, tokenHash: hash, expiresAt: new Date(Date.now() + 60 * 60 * 1000), ipAddress: ip });

  const resetUrl = `${config.CLIENT_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
  sendEmail({ to: email, subject: 'Password reset request', template: React.createElement(ResetPasswordTemplate, { url: resetUrl }) });
  res.status(200).json({ message: 'If that email exists, a reset link was sent' });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' });

  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const resetReq = await PasswordReset.findOne({ tokenHash: hash });
  if (!resetReq) return res.status(400).json({ message: 'Invalid token' });
  if (resetReq.expiresAt < new Date()) return res.status(400).json({ message: 'Token expired' });
  if (resetReq.usedAt) return res.status(400).json({ message: 'Token already used' });

  if (!validatePasswordRules(newPassword)) return res.status(400).json({ message: 'Password does not meet complexity requirements.' });
  const isBreached = await checkBreachedPassword(newPassword);
  if (isBreached) return res.status(400).json({ message: 'Password has appeared in a data breach.' });

  const user = await User.findById(resetReq.userId);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isSame = await verifyPassword(user.passwordHash || '', newPassword);
  if (isSame) return res.status(400).json({ message: 'New password cannot be the same as the old one' });

  user.passwordHash = await hashPassword(newPassword);
  user.mustChangePwd = false;
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  await user.save();

  resetReq.usedAt = new Date();
  await resetReq.save();

  await revokeAllUserSessions(user._id);
  await logAuthEvent({ userId: user._id, eventType: 'PASSWORD_RESET', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true });
  res.status(200).json({ message: 'Password updated. Please log in.' });
});

export const enableMfa = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const secret = generateOtpSecret();
  const { codes, hashes } = await generateBackupCodes(8);
  const user = (req as any).user;

  const mfaConfig = await MfaConfig.findOne({ userId: user._id });
  if (mfaConfig && mfaConfig.isEnabled) return res.status(400).json({ message: 'MFA is already enabled' });

  await MfaConfig.findOneAndUpdate(
    { userId: user._id },
    { secret, method: 'TOTP', isEnabled: false, backupCodes: hashes.map(h => ({ codeHash: h, isUsed: false })) },
    { upsert: true }
  );

  const qrCodeUrl = `otpauth://totp/ResearchPortal:${user.email}?secret=${secret}&issuer=ResearchPortal`;
  res.status(200).json({ secret, qrCodeUrl, backupCodes: codes });
});

export const verifyMfa = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token is required' });

  const user = (req as any).user;
  const mfaConfig = await MfaConfig.findOne({ userId: user._id });
  if (!mfaConfig) return res.status(400).json({ message: 'MFA setup not initiated' });

  const isValid = verifyOtp(mfaConfig.secret, token);
  if (!isValid) return res.status(400).json({ message: 'Invalid code' });

  mfaConfig.isEnabled = true;
  mfaConfig.enabledAt = new Date();
  await mfaConfig.save();

  await logAuthEvent({ userId: user._id, eventType: 'MFA_ENABLED', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true });
  res.status(200).json({ success: true, message: 'MFA enabled successfully' });
});

export const verifyBackupCode = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { code } = req.body;
  const user = (req as any).user;

  const mfaConfig = await MfaConfig.findOne({ userId: user._id, isEnabled: true });
  if (!mfaConfig) return res.status(400).json({ message: 'MFA not enabled' });

  let matched = false;
  for (const backup of mfaConfig.backupCodes) {
    if (!backup.isUsed && await verifyPassword(backup.codeHash, code)) {
      backup.isUsed = true;
      backup.usedAt = new Date();
      matched = true;
      break;
    }
  }

  if (!matched) return res.status(401).json({ message: 'Invalid backup code' });
  await mfaConfig.save();

  const ip = getIp(req);
  const ua = req.headers['user-agent'] || '';
  const { session, refreshToken } = await createSession(user._id, { browser: 'Unknown', os: 'Unknown', deviceType: 'desktop' }, ip, ua);
  const accessToken = generateAccessToken({ sub: user._id.toString(), role: user.role, sessionId: session._id.toString() });

  res.cookie('__rt', refreshToken, { httpOnly: true, secure: config.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(200).json({ accessToken, user: user.toSafeObject() });
});

export const getSessions = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const sessions = await getUserActiveSessions((req as any).user._id);
  const formatted = sessions.map(s => ({
    ...s.toObject(),
    isCurrent: (req as any).session && s.id === (req as any).session._id.toString()
  }));
  res.status(200).json({ sessions: formatted });
});

export const revokeSession = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  await revokeAuthSession(id as any);
  await logAuthEvent({ userId: (req as any).user._id, eventType: 'SESSION_REVOKED', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true, metadata: { sessionId: id } });
  res.status(200).json({ message: 'Session revoked' });
});

export const revokeAllSessions = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  await revokeAllUserSessions((req as any).user._id, (req as any).session ? (req as any).session._id : undefined);
  await logAuthEvent({ userId: (req as any).user._id, eventType: 'SESSION_REVOKED', ipAddress: getIp(req), userAgent: req.headers['user-agent'] || '', success: true, metadata: { all: true } });
  res.status(200).json({ message: 'All other sessions revoked' });
});

export const getMe = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  res.status(200).json({ user: (req as any).user.toSafeObject() });
});

export const magicLink = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const ip = getIp(req);
  const rl = await checkRateLimit(Profiles.LOGIN_ATTEMPT_EMAIL(email).key, 3, 3600);
  if (!rl.allowed) return res.status(429).json({ message: 'Too many requests' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(200).json({ message: 'If the email exists, a link was sent.' });

  const { token, hash } = generateEmailToken();
  await redis.setex(`magiclink:${hash}`, 15 * 60, user._id.toString());

  const link = `${config.CLIENT_URL || 'http://localhost:3000'}/auth/magic-link?token=${token}`;
  sendEmail({ to: email, subject: 'Your Magic Link', template: React.createElement(VerifyEmailTemplate, { url: link }) });

  res.status(200).json({ message: 'If the email exists, a link was sent.' });
});

export const oauthLogin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  res.status(501).json({ message: 'OAuth not fully implemented yet' });
});