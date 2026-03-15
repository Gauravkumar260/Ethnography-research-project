import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger';
import { checkRateLimit } from '../lib/auth/rateLimit';

export const rateLimiter = (profileFactory: (req: Request) => { key: string, max: number, window: number }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = profileFactory(req);
      const result = await checkRateLimit(profile.key, profile.max, profile.window);

      res.setHeader('X-RateLimit-Limit', profile.max);
      res.setHeader('X-RateLimit-Remaining', result.remaining);
      res.setHeader('X-RateLimit-Reset', Math.floor(result.resetAt.getTime() / 1000));

      if (!result.allowed) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.'
        });
      }
      next();
    } catch (err) {
      // Fail open — if Redis goes down, don't block auth entirely.
      logger.error('Rate limit error:', err);
      next();
    }
  };
};
