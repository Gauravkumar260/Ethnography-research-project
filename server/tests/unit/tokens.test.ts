import { describe, it, expect, vi } from 'vitest';
import { generateEmailToken } from '../../src/lib/auth/tokens';

describe('Auth Tokens Utils', () => {
  describe('generateEmailToken', () => {
    it('should generate a token and its hash', () => {
      const result = generateEmailToken();
      
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('hash');
      
      // Token should be hex encoded, 64 chars long (32 bytes)
      expect(result.token.length).toBe(64);
      
      // Hash should be a valid sha256 hex string (64 chars)
      expect(result.hash.length).toBe(64);
      expect(result.token).not.toBe(result.hash);
    });
  });
});
