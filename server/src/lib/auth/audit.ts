import { AuthEvent } from '../db/models';
import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export interface AuthEventInput {
  userId?: mongoose.Types.ObjectId | null;
  eventType: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  metadata?: Record<string, unknown>;
  riskScore?: number | null;
}

export async function logAuthEvent(eventInput: AuthEventInput): Promise<void> {
  try {
    await AuthEvent.create({
      ...eventInput,
      metadata: eventInput.metadata || {}
    });
  } catch (error) {
    logger.error({ error, eventInput }, 'Failed to log auth event');
    // Fire-and-forget: we do not throw here to prevent blocking the auth flow
  }
}

export async function getAuthEvents(userId: mongoose.Types.ObjectId, filters = {}): Promise<any[]> {
  return await AuthEvent.find({ userId, ...filters }).sort({ createdAt: -1 });
}

export async function getFailedLoginAttempts(userId: mongoose.Types.ObjectId, sinceDate: Date): Promise<number> {
  return await AuthEvent.countDocuments({
    userId,
    eventType: 'LOGIN_FAILED',
    createdAt: { $gte: sinceDate }
  });
}
