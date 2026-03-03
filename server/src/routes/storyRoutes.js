const express = require('express');
const router = express.Router();

const { getStories, getStoryById, createStory } = require('../controllers/storyController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getStories);
router.get('/:id', getStoryById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createStory);

module.exports = router;