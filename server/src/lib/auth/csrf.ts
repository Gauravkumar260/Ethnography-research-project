import * as crypto from 'crypto';
import { redis } from './rateLimit';

/**
 * Generates a CSRF token and a corresponding cookie secret.
 * Stores the association in Redis.
 */
export async function generateCsrfToken(sessionId: string): Promise<{ token: string; secret: string }> {
  const secret = crypto.randomBytes(32).toString('hex');
  const token = crypto.createHmac('sha256', secret).update(sessionId).digest('hex');
  
  await redis.setex(`csrf:${sessionId}`, 3600, secret); // 1 hour TTL
  
  return { token, secret };
}

/**
 * Validates a given CSRF token against the stored secret for a session.
 */
export async function validateCsrfToken(sessionId: string, token: string): Promise<boolean> {
  const storedSecret = await redis.get(`csrf:${sessionId}`);
  if (!storedSecret) return false;
  
  const expectedToken = crypto.createHmac('sha256', storedSecret).update(sessionId).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
}