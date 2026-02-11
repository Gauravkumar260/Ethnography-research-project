const express = require('express');
const router = express.Router();
const { 
  uploadDocumentary, 
  getDocumentaries, 
  approveDocumentary, 
  deleteDocumentary,
  getAllDocumentariesAdmin 
} = require('../controllers/docController');
const { mediaUpload } = require('../middlewares/uploadMiddleware'); 
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public route for fetching approved documentaries
router.get('/', getDocumentaries);

// Protected Routes
router.post(
  '/upload',
  protect, 
  mediaUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  uploadDocumentary
);

// Admin Routes
router.get('/admin/all', protect, authorize('admin'), getAllDocumentariesAdmin);
router.patch('/approve/:id', protect, authorize('admin'), approveDocumentary);
router.delete('/:id', protect, authorize('admin'), deleteDocumentary);

module.exports = router;