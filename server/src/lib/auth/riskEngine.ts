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
): Promise<RiskScore> {
  let score = 0.0;
  const reasons: string[] = [];

  try {
    const pastSessions = await getUserActiveSessions(userId);
    
    // New IP
    const hasSeenIp = pastSessions.some(s => s.ipAddress === ipAddress);
    if (!hasSeenIp) {
      score += 0.3;
      reasons.push('New IP address');
    }

    // New User Agent
    const hasSeenUserAgent = pastSessions.some(s => s.userAgent === userAgent);
    if (!hasSeenUserAgent) {
      score += 0.3;
      reasons.push('New browser/device');
    }

    // Geo Location Check
    const geo = await getIpGeoLocation(ipAddress);
    if (geo && pastSessions.length > 0) {
      const lastSessionWithGeo = pastSessions.find(s => s.location && s.location.country);
      if (lastSessionWithGeo && lastSessionWithGeo.location) {
        if (lastSessionWithGeo.location.country !== geo.country) {
          score += 0.4;
          reasons.push('New country');
        }
      }
    }

    // Recent failed attempts
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentFailures = await getFailedLoginAttempts(userId, oneHourAgo);
    if (recentFailures > 0) {
      score += Math.min(0.4, recentFailures * 0.1);
      reasons.push(`Recent failed attempts: \${recentFailures}`);
    }

    // Unknown/Suspicious IP (Mock integration)
    // if (await isMaliciousIp(ipAddress)) score += 0.5;

    return { score: Math.min(1.0, score), reasons };
  } catch (error) {
    logger.error({ error, userId }, 'Error scoring login risk');
    return { score, reasons }; // Default to calculated score on error
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
