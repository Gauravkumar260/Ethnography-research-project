import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
// @ts-ignore
import { authenticator } from 'otplib';
import * as argon2 from 'argon2';

export interface AccessTokenPayload {
  sub: string;
  role: string;
  sessionId: string;
  jti?: string;
}

const getPrivateKey = () => process.env.RS256_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
const getPublicKey = () => process.env.RS256_PUBLIC_KEY?.replace(/\\n/g, '\n') || '';

export function generateAccessToken(payload: AccessTokenPayload): string {
  const jti = crypto.randomUUID();
  return jwt.sign({ ...payload, jti }, getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn: '15m'
  });
}

export async function generateRefreshToken(): Promise<{ token: string, hash: string }> {
  const token = crypto.randomBytes(64).toString('hex');
  const hash = await bcrypt.hash(token, 10);
  return { token, hash };
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, getPublicKey(), { algorithms: ['RS256'] }) as AccessTokenPayload;
  } catch (err) {
    return null;
  }
}

export function generateEmailToken(): { token: string, hash: string } {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hash };
}

export function generateOtpSecret(): string {
  return authenticator.generateSecret();
}

export function verifyOtp(secret: string, token: string): boolean {
  return authenticator.verify({ token, secret });
}

export async function generateBackupCodes(count = 8): Promise<{ codes: string[], hashes: string[] }> {
  const codes: string[] = [];
  const hashes: string[] = [];

  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(5).toString('hex').toUpperCase(); // 10 chars
    codes.push(code);
    const hash = await argon2.hash(code, { type: argon2.argon2id });
    hashes.push(hash);
  }
  return { codes, hashes };
}
