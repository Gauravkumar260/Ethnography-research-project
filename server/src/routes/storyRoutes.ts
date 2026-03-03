import express from 'express';
const router = express.Router();

import {  getStories, getStoryById, createStory  } from '../controllers/storyController';
import {  protect, authorize  } from '../middlewares/authMiddleware';

// Public routes
router.get('/', getStories);
router.get('/:id', getStoryById);

// Protected routes (Admin only)
router.post('/', protect, authorize('ADMIN'), createStory);

export default router;