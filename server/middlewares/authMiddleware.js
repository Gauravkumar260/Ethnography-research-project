const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==========================================
// 1. PROTECT (Checks if user is logged in)
// ==========================================
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// ==========================================
// 2. AUTHORIZE (Checks Role: 'admin', 'student')
// ==========================================
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Check if user's role is in the allowed list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

// ✅ EXPORT BOTH FUNCTIONS
module.exports = { protect, authorize };