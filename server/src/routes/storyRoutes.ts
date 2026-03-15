import express from 'express';
const router = express.Router();

import {  getStories, getStoryById, createStory  } from '../controllers/storyController';
import {  protect, authorize  } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { storySchema } from '../lib/validations';

// Public routes
router.get('/', getStories);
router.get('/:id', getStoryById);

// Protected routes (Admin only)
router.post('/', protect, authorize('ADMIN'), validate(storySchema), createStory);

export default router;