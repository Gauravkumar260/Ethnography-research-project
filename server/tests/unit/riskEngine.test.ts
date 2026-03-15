import { describe, it, expect, vi } from 'vitest';
import { scoreLoginRisk } from '../../src/lib/auth/riskEngine';
import * as sessionsModule from '../../src/lib/auth/sessions';
import * as auditModule from '../../src/lib/auth/audit';
import mongoose from 'mongoose';

vi.mock('../../src/lib/auth/sessions');
vi.mock('../../src/lib/auth/audit');
// Mock fetch for Geo IP
global.fetch = vi.fn() as any;

describe('Risk Engine', () => {
  const userId = new mongoose.Types.ObjectId();

  it('should return base score 0 for known good login', async () => {
    vi.spyedOn(sessionsModule, 'getUserActiveSessions').mockResolvedValue([{
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0'
    } as any]);
    vi.spyedOn(auditModule, 'getFailedLoginAttempts').mockResolvedValue(0);
    
    const { score, reasons } = await scoreLoginRisk(userId, '192.168.1.1', 'Mozilla/5.0', 'fingerprint-1');
    expect(score).toBe(0);
    expect(reasons.length).toBe(0);
  });

  it('should increase score for unknown IP', async () => {
    vi.spyedOn(sessionsModule, 'getUserActiveSessions').mockResolvedValue([{
      ipAddress: '10.0.0.1',
      userAgent: 'Mozilla/5.0'
    } as any]);
    vi.spyedOn(auditModule, 'getFailedLoginAttempts').mockResolvedValue(0);
    
    const { score, reasons } = await scoreLoginRisk(userId, '192.168.1.1', 'Mozilla/5.0', 'fingerprint-1');
    expect(score).toBeGreaterThanOrEqual(0.3);
    expect(reasons).toContain('New IP address');
  });

  it('should stack risk factors for suspicious logins', async () => {
    vi.spyedOn(sessionsModule, 'getUserActiveSessions').mockResolvedValue([{
      ipAddress: '10.0.0.1',
      userAgent: 'Chrome'
    } as any]);
    vi.spyedOn(auditModule, 'getFailedLoginAttempts').mockResolvedValue(3); // +0.3
    
    const { score, reasons } = await scoreLoginRisk(userId, '192.168.1.1', 'Mozilla/5.0', 'fingerprint-1');
    // +0.3 (IP) + 0.3 (UA) + 0.3 (Failed attempts)
    expect(score).toBeGreaterThanOrEqual(0.9);
    expect(reasons.length).toBe(3);
  });
});
