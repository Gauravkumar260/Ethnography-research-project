import { redis } from '../auth/rateLimit';
import { logger } from '../logger';

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache Get Error [${key}]:`, error);
      return null;
    }
  },

  async set(key: string, value: any, ttlSeconds: number = 120): Promise<void> {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      logger.error(`Cache Set Error [${key}]:`, error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error(`Cache Del Error [${key}]:`, error);
    }
  },

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.error(`Cache DelPattern Error [${pattern}]:`, error);
    }
  }
};
