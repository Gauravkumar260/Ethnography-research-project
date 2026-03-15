import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimit, Profiles } from '../../src/lib/auth/rateLimit';
import { redis } from '../../src/lib/auth/rateLimit';

vi.mock('../../src/lib/auth/rateLimit', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/lib/auth/rateLimit')>();
  return {
    ...actual,
    redis: {
      eval: vi.fn(),
      del: vi.fn()
    }
  };
});

describe('Rate Limiter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow requests within limit', async () => {
    (redis.eval as any).mockResolvedValue([1, 60]); // count = 1, ttl = 60
    
    const result = await checkRateLimit('test-ip', 5, 60);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('should block requests over limit', async () => {
    (redis.eval as any).mockResolvedValue([6, 60]); // count = 6, ttl = 60
    
    const result = await checkRateLimit('test-ip', 5, 60);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should return correct reset time', async () => {
    (redis.eval as any).mockResolvedValue([1, 300]); // 5 minutes TTL
    
    const result = await checkRateLimit('test-ip', 5, 300);
    const timeDiff = result.resetAt.getTime() - Date.now();
    expect(timeDiff).toBeGreaterThan(290000); // ~ 300s
    expect(timeDiff).toBeLessThanOrEqual(300000);
  });
});
