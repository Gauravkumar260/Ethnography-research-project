const express = require('express');
const router = express.Router();
// 1. Import Middleware (Add authorize back for security)
const { protect, authorize } = require('../middlewares/authMiddleware');

// 2. Import Controller Functions (These match your controller exactly)
const {
  getCommunities,      // Matches controller export
  getCommunityBySlug,
  getCommunityStats,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require('../controllers/communityController');

// ==========================
// PUBLIC ROUTES
// ==========================
router.get('/', getCommunities);
router.get('/:slug', getCommunityBySlug);
router.get('/:slug/stats', getCommunityStats);

// ==========================
// ADMIN ROUTES (Protected)
// ==========================
// Added authorize('admin') so only Admins can change data
router.post('/', protect, authorize('admin'), createCommunity);
router.put('/:id', protect, authorize('admin'), updateCommunity);
router.delete('/:id', protect, authorize('admin'), deleteCommunity);

module.exports = router;