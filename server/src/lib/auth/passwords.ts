import * as argon2 from 'argon2';
import zxcvbn from 'zxcvbn';
import * as crypto from 'crypto';

/**
 * Hashes a password using argon2id.
 */
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
}

/**
 * Verifies an argon2id password hash.
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
}

/**
 * Evaluates password strength using zxcvbn.
 * Returns score 0-4 and feedback.
 */
export function checkPasswordStrength(password: string): { score: number; feedback: string[] } {
  const result = zxcvbn(password);
  return {
    score: result.score,
    feedback: result.feedback.suggestions || []
  };
}

/**
 * Checks if a password has been breached using the HaveIBeenPwned API (k-anonymity).
 */
export async function checkBreachedPassword(password: string): Promise<boolean> {
  const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5);

  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
      return false; // Fail open if API is down to not block login/register
    }
    const data = await response.text();
    const hashes = data.split('\n').map(line => line.split(':')[0].trim());
    return hashes.includes(suffix);
  } catch (error) {
    console.error('HIBP API error:', error);
    return false;
  }
}

/**
 * Validates minimum password rules.
 */
export function validatePasswordRules(password: string): boolean {
  const minLength = 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpper && hasLower && hasDigit && hasSpecial;
}
