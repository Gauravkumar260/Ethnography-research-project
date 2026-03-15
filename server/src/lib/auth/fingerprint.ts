import * as crypto from 'crypto';

/**
 * Generates a robust server-side device fingerprint based on request headers.
 */
export function generateServerFingerprint(headers: Record<string, string | string[] | undefined>, ip: string): string {
  const components = [
    headers['user-agent'] || '',
    headers['accept-language'] || '',
    headers['sec-ch-ua'] || '',
    headers['sec-ch-ua-mobile'] || '',
    headers['sec-ch-ua-platform'] || '',
    ip
  ];
  
  return crypto.createHash('sha256').update(components.join('|')).digest('hex');
}

/**
 * Validates a client-provided canvas fingerprint hash.
 */
export function validateClientFingerprint(clientHash: string, expectedHash: string): boolean {
  if (!clientHash || !expectedHash) return false;
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(clientHash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    );
  } catch {
    return false;
  }
}