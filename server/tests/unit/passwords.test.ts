import { describe, it, expect } from 'vitest';
import { 
  validatePasswordRules, 
  checkPasswordStrength 
} from '../../src/lib/auth/passwords';

describe('Auth Passwords Utils', () => {
  describe('validatePasswordRules', () => {
    it('should reject short passwords', () => {
      expect(validatePasswordRules('Short1!')).toBe(false);
    });

    it('should reject passwords missing uppercase', () => {
      expect(validatePasswordRules('alllowercase123!')).toBe(false);
    });

    it('should reject passwords missing lowercase', () => {
      expect(validatePasswordRules('ALLUPPERCASE123!')).toBe(false);
    });

    it('should reject passwords missing digits', () => {
      expect(validatePasswordRules('NoDigitsHere!')).toBe(false);
    });

    it('should reject passwords missing special chars', () => {
      expect(validatePasswordRules('NoSpecialChar123')).toBe(false);
    });

    it('should accept valid passwords', () => {
      expect(validatePasswordRules('SuperSecurePassword123!')).toBe(true);
    });
  });

  describe('checkPasswordStrength', () => {
    it('should return a score from 0-4', () => {
      const { score, feedback } = checkPasswordStrength('Tr0ub4dor&3');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(4);
      expect(Array.isArray(feedback)).toBe(true);
    });
    
    it('should score weak passwords low', () => {
      const { score } = checkPasswordStrength('password123');
      expect(score).toBeLessThan(3);
    });
  });
});
