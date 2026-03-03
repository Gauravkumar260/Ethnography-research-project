import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Session, User } from '../db/models';
import { redis } from './rateLimit';
import { generateAccessToken, generateRefreshToken } from './tokens';
import { logAuthEvent } from './audit';
import pino from 'pino';

const logger = pino();

export interface DeviceInfo {
  browser: string;
  os: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

export async function createSession(
  userId: mongoose.Types.ObjectId,
  deviceInfo: DeviceInfo,
  ipAddress: string,
  userAgent: string
) {
  const { token, hash } = await generateRefreshToken();
  const tokenFamily = new mongoose.Types.ObjectId().toString(); // Initial family ID

  // Get location (Mocking geo-lookup for now)
  const location = null; 

  const session = await Session.create({
    userId,
    refreshTokenHash: hash,
    tokenFamily,
    deviceInfo,
    ipAddress,
    userAgent,
    location,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  // Cache in Redis
  await redis.setex(`session:${session._id}`, 30 * 24 * 60 * 60, JSON.stringify(session.toObject()));

  return { session, refreshToken: token };
}

export async function getSession(sessionId: string) {
  const cached = await redis.get(`session:${sessionId}`);
  if (cached) return JSON.parse(cached);

  const session = await Session.findById(sessionId);
  if (session && session.isActive) {
    await redis.setex(`session:${sessionId}`, 30 * 24 * 60 * 60, JSON.stringify(session.toObject()));
    return session;
  }
  return null;
}

export async function refreshSession(
  oldRefreshToken: string,
  deviceInfo: DeviceInfo,
  ipAddress: string,
  userAgent: string
) {
  // Find session by comparing hashes (Need to iterate or have a token id in the JWT)
  // For security & performance, in production we would embed the sessionId in the refresh token string (e.g. sessionId.randomString)
  // For this example, assuming oldRefreshToken format is "sessionId.tokenString"
  const [sessionId, tokenString] = oldRefreshToken.includes('.') 
    ? oldRefreshToken.split('.') 
    : [null, oldRefreshToken];

  let session;
  if (sessionId) {
    session = await Session.findById(sessionId);
  } else {
    // Fallback: This is highly inefficient in MongoDB. The token MUST include the ID in reality.
    // Assuming the user implements "sessionId.tokenString" moving forward.
    throw new Error('Refresh token must contain session ID');
  }

  if (!session) return null;

  const isValid = await bcrypt.compare(tokenString, session.refreshTokenHash);

  if (!isValid || !session.isActive) {
    // REUSE DETECTED!
    logger.warn({ sessionId: session._id, userId: session.userId }, 'Refresh token reuse detected!');
    await revokeAllUserSessions(session.userId);
    await logAuthEvent({
      userId: session.userId,
      eventType: 'SUSPICIOUS_ACTIVITY',
      ipAddress,
      userAgent,
      success: false,
      metadata: { reason: 'Refresh token reuse' }
    });
    return null;
  }

  // Rotate token
  const { token, hash } = await generateRefreshToken();
  
  session.refreshTokenHash = hash;
  session.lastUsedAt = new Date();
  session.ipAddress = ipAddress;
  session.userAgent = userAgent;
  await session.save();

  await redis.setex(`session:${session._id}`, 30 * 24 * 60 * 60, JSON.stringify(session.toObject()));

  const user = await User.findById(session.userId);
  if (!user) return null;

  const accessToken = generateAccessToken({
    sub: user._id.toString(),
    role: user.role,
    sessionId: session._id.toString()
  });

  return { accessToken, refreshToken: `${session._id}.${token}` };
}

export async function revokeSession(sessionId: string) {
  await Session.findByIdAndUpdate(sessionId, { isActive: false, revokedAt: new Date() });
  await redis.del(`session:${sessionId}`);
}

export async function revokeAllUserSessions(userId: mongoose.Types.ObjectId, exceptSessionId?: string) {
  const query: any = { userId, isActive: true };
  if (exceptSessionId) {
    query._id = { $ne: exceptSessionId };
  }

  const sessions = await Session.find(query);
  const sessionIds = sessions.map(s => s._id);

  await Session.updateMany(query, { isActive: false, revokedAt: new Date() });
  
  const pipeline = redis.pipeline();
  sessionIds.forEach(id => pipeline.del(`session:${id}`));
  await pipeline.exec();
}

export async function getUserActiveSessions(userId: mongoose.Types.ObjectId) {
  return await Session.find({ userId, isActive: true }).sort({ lastUsedAt: -1 });
}
