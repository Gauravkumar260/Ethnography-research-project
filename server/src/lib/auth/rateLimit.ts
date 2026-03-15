import { config } from '../../config/env';
import { logger } from '../logger';
import Redis from 'ioredis';

const REDIS_URL = config.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(REDIS_URL);

redis.on('error', (err) => {
  logger.error('[ioredis] Error connecting to Redis:', err.message);
});

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

const rateLimitScript = `
  local current = redis.call("INCR", KEYS[1])
  if current == 1 then
    redis.call("EXPIRE", KEYS[1], ARGV[1])
  end
  local ttl = redis.call("TTL", KEYS[1])
  return {current, ttl}
`;

export async function checkRateLimit(key: string, maxAttempts: number, windowSeconds: number): Promise<RateLimitResult> {
  const redisKey = `ratelimit:\${key}`;

  const results = await redis.eval(rateLimitScript, 1, redisKey, windowSeconds) as [number, number];

  const count = results[0];
  const ttl = results[1];

  const allowed = count <= maxAttempts;
  const remaining = Math.max(0, maxAttempts - count);
  const resetAt = new Date(Date.now() + ttl * 1000);

  return { allowed, remaining, resetAt };
}

export async function recordFailedAttempt(key: string): Promise<void> {
  // Not strictly needed with the generic checkRateLimit, but implemented for flexibility
  const redisKey = `ratelimit:fail:${key}`;
  await redis.incr(redisKey);
  await redis.expire(redisKey, 3600);
}

export async function resetRateLimit(key: string): Promise<void> {
  await redis.del(`ratelimit:${key}`);
}

export const Profiles = {
  LOGIN_ATTEMPT_IP: (ip: string) => ({ key: `login:ip:${ip}`, max: 5, window: 15 * 60 }),
  LOGIN_ATTEMPT_EMAIL: (email: string) => ({ key: `login:email:${email}`, max: 10, window: 60 * 60 }),
  REGISTER: (ip: string) => ({ key: `register:ip:${ip}`, max: 3, window: 60 * 60 }),
  REFRESH: (ip: string) => ({ key: `refresh:ip:${ip}`, max: 20, window: 15 * 60 }),
  PASSWORD_RESET: (email: string) => ({ key: `pwdreset:email:${email}`, max: 3, window: 60 * 60 }),
  PASSWORD_RESET_IP: (ip: string) => ({ key: `pwdreset:ip:${ip}`, max: 10, window: 24 * 60 * 60 }),
  EMAIL_VERIFY_RESEND: (userId: string) => ({ key: `verifyresend:user:${userId}`, max: 3, window: 60 * 60 }),
  MFA_ATTEMPT: (userId: string) => ({ key: `mfa:${userId}`, max: 5, window: 15 * 60 }),
  API_GLOBAL: (ip: string) => ({ key: `api:${ip}`, max: 100, window: 60 })
};
