declare module 'cors';
declare module 'xss-clean';
declare module 'hpp';
declare module 'cookie-parser';
declare module 'csurf';
declare module 'zxcvbn';
declare module 'pino';
declare module 'jsonwebtoken';
declare module 'argon2';
declare module 'bcryptjs';

declare namespace Express {
  interface Request {
    csrfToken(): string;
    session?: import('../lib/db/models/Session').ISession;
    user?: any;
    files?: any;
  }
}
