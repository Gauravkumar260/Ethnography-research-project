import { logger } from '../lib/logger';
import { Request, Response, NextFunction } from 'express';
import User from '../lib/db/models/User';
import { verifyAccessToken } from '../lib/auth/tokens';
import { validateCsrfToken } from '../lib/auth/csrf';
import { randomUUID } from 'crypto';

export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.headers['x-request-id'] || randomUUID();
  (req as any).correlationId = reqId;
  res.setHeader('X-Request-ID', reqId as string);
  next();
};

export const csrfProtection = async (req: Request, res: Response, next: NextFunction) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  
  const token = req.headers['x-csrf-token'];
  const sessionId = req.headers['x-session-id'] || (req.cookies && req.cookies.__rt ? req.cookies.__rt.split('.')[0] : null);
  
  if (!token || !sessionId) {
    return res.status(403).json({ message: 'CSRF token missing or invalid' });
  }

  const isValid = await validateCsrfToken(sessionId as string, token as string);
  if (!isValid) {
    return res.status(403).json({ message: 'CSRF token invalid' });
  }
  
  next();
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = verifyAccessToken(token);

      if (!decoded) {
         return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
      }

      const user = await User.findById(decoded.sub).select('-passwordHash');

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      (req as any).user = user;
      // Assume the decoded token payload has sessionId if needed
      if (decoded.sessionId) {
        (req as any).session = { _id: decoded.sessionId };
      }

      next();
    } catch (error: any) {
      logger.error('Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const userRole = user.role.toLowerCase();
    const normalizedAllowedRoles = roles.map(role => role.toLowerCase());

    const isAuthorized = normalizedAllowedRoles.some(role => {
      if (role === 'admin') {
        return userRole === 'super_admin' || userRole === 'department_admin';
      }
      return userRole === role;
    });

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: `User role '${user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};