import express from 'express';
const router = express.Router();
// 1. Import Middleware (Add authorize back for security)
import {  protect, authorize  } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { communitySchema } from '../lib/validations';

// 2. Import Controller Functions (These match your controller exactly)
import { 
  getCommunities,      // Matches controller export
  getCommunityBySlug,
  getCommunityStats,
  createCommunity,
  updateCommunity,
  deleteCommunity,
 } from '../controllers/communityController';

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
router.post('/', protect, authorize('ADMIN'), validate(communitySchema), createCommunity);
router.put('/:id', protect, authorize('ADMIN'), validate(communitySchema), updateCommunity);
router.delete('/:id', protect, authorize('ADMIN'), deleteCommunity);

export default router;