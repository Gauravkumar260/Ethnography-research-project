import { Request, Response, NextFunction } from 'express';
import User from '../lib/db/models/User';
import { verifyAccessToken } from '../lib/auth/tokens';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc: any, cookieStr: string) => {
      const [key, value] = cookieStr.split('=').map(c => c.trim());
      acc[key] = value;
      return acc;
    }, {});
    // Assuming the access token might not be in a cookie in this new architecture,
    // usually it's in Authorization header, but just in case:
    token = cookies.token || cookies.accessToken; 
  }

  if (token) {
    try {
      const decoded = verifyAccessToken(token);

      if (!decoded) {
         return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
      }

      req.user = await User.findById(decoded.sub).select('-passwordHash');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // We can also attach the session info
      // req.session = ...

      next();
    } catch (error: any) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const userRole = req.user.role.toLowerCase();
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
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};
