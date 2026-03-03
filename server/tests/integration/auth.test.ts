import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import User from '../../src/lib/db/models/User';
import Department from '../../src/lib/db/models/Department';
import { hashPassword, verifyPassword } from '../../src/lib/auth/passwords';

describe('Auth API Integration Tests', () => {
  let departmentId: any;
  let testUser: any;
  let csrfToken: string;
  let csrfCookie: string;

  beforeEach(async () => {
    const dept = await Department.create({
      name: 'Computer Science',
      code: 'CS',
      institutionDomain: 'university.edu'
    });
    departmentId = dept._id;

    const hashedPassword = await hashPassword('TestPass123!');
    testUser = await User.create({
      email: 'test@university.edu',
      passwordHash: hashedPassword,
      fullName: 'Test User',
      role: 'STUDENT',
      departmentId,
      emailVerified: true
    });

    // Get CSRF token
    const res = await request(app).get('/api/csrf-token');
    csrfToken = res.body.csrfToken;
    csrfCookie = res.headers['set-cookie'][0].split(';')[0];
  });

  describe('POST /api/auth/login', () => {
    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .set('Cookie', csrfCookie)
        .set('X-CSRF-Token', csrfToken)
        .set('User-Agent', 'supertest')
        .send({
          email: 'test@university.edu',
          password: 'WrongPassword1!',
          deviceFingerprint: 'test-device'
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should login successfully and return tokens', async () => {
      console.log('Testing password verification manually...', await verifyPassword(testUser.passwordHash, 'TestPass123!'));

      const res = await request(app)
        .post('/api/auth/login')
        .set('Cookie', csrfCookie)
        .set('X-CSRF-Token', csrfToken)
        .set('User-Agent', 'supertest')
        .send({
          email: 'test@university.edu',
          password: 'TestPass123!',
          deviceFingerprint: 'test-device'
        });

      if (res.status !== 200) console.log(res.body);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.headers['set-cookie']).toBeDefined();
      // Ensure the refresh token cookie is set
      const cookies = res.headers['set-cookie'].join(';');
      expect(cookies).toMatch(/__rt=/);
    });
  });
});
