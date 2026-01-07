const express = require('express');
const router = express.Router();
// Import controller functions
const {
  getCommunities,
  getCommunityBySlug,
  getCommunityStats,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} = require('../controllers/communityController');

// Import middleware
const { protect } = require('../middlewares/authMiddleware');

// ==========================
// PUBLIC ROUTES
// ==========================
router.get('/', getCommunities);
router.get('/:slug', getCommunityBySlug);
router.get('/:slug/stats', getCommunityStats);

// ==========================
// PROTECTED ROUTES (Admin)
// ==========================
router.post('/', protect, createCommunity);
router.put('/:id', protect, updateCommunity);
router.delete('/:id', protect, deleteCommunity);

module.exports = router;