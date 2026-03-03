import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(REDIS_URL);

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export async function checkRateLimit(key: string, maxAttempts: number, windowSeconds: number): Promise<RateLimitResult> {
  const redisKey = `ratelimit:${key}`;
  
  const multi = redis.multi();
  multi.incr(redisKey);
  multi.ttl(redisKey);
  
  const results = await multi.exec();
  if (!results) throw new Error('Redis multi failed');
  
  const count = results[0][1] as number;
  let ttl = results[1][1] as number;
  
  if (ttl === -1 || count === 1) {
    await redis.expire(redisKey, windowSeconds);
    ttl = windowSeconds;
  }
  
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
  PASSWORD_RESET: (email: string) => ({ key: `pwdreset:email:${email}`, max: 3, window: 60 * 60 }),
  PASSWORD_RESET_IP: (ip: string) => ({ key: `pwdreset:ip:${ip}`, max: 10, window: 24 * 60 * 60 }),
  EMAIL_VERIFY_RESEND: (userId: string) => ({ key: `verifyresend:user:${userId}`, max: 3, window: 60 * 60 }),
  MFA_ATTEMPT: (userId: string) => ({ key: `mfa:${userId}`, max: 5, window: 15 * 60 }),
  API_GLOBAL: (ip: string) => ({ key: `api:${ip}`, max: 100, window: 60 })
};
