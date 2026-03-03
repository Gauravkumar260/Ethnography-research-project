import mongoose from 'mongoose';
import { getUserActiveSessions } from './sessions';
import { getFailedLoginAttempts } from './audit';
import pino from 'pino';

const logger = pino();

export interface RiskScore {
  score: number;
  reasons: string[];
}

interface GeoLocation {
  country: string;
  region: string;
  city: string;
}

export async function scoreLoginRisk(
  userId: mongoose.Types.ObjectId,
  ipAddress: string,
  userAgent: string,
  deviceFingerprint: string
): Promise<number> {
  let score = 0.0;

  try {
    const pastSessions = await getUserActiveSessions(userId);
    
    // New IP
    const hasSeenIp = pastSessions.some(s => s.ipAddress === ipAddress);
    if (!hasSeenIp) {
      score += 0.3;
    }

    // New User Agent
    const hasSeenUserAgent = pastSessions.some(s => s.userAgent === userAgent);
    if (!hasSeenUserAgent) {
      score += 0.3;
    }

    // Recent failed attempts
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentFailures = await getFailedLoginAttempts(userId, oneHourAgo);
    score += Math.min(0.4, recentFailures * 0.1);

    // Unknown/Suspicious IP (Mock integration)
    // if (await isMaliciousIp(ipAddress)) score += 0.5;

    return Math.min(1.0, score);
  } catch (error) {
    logger.error({ error, userId }, 'Error scoring login risk');
    return score; // Default to calculated score on error
  }
}

export async function getIpGeoLocation(ip: string): Promise<GeoLocation | null> {
  if (ip === '127.0.0.1' || ip === '::1') return null;
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.status === 'success') {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city
      };
    }
    return null;
  } catch (error) {
    logger.error({ error, ip }, 'GeoIP lookup failed');
    return null;
  }
}
