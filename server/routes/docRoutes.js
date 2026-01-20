const express = require('express');
const router = express.Router();
const { uploadDocumentary, getDocumentaries } = require('../controllers/docController');
const { mediaUpload } = require('../middlewares/uploadMiddleware'); // Uses the media configuration
const { protect } = require('../middlewares/authMiddleware');

// Protected route for uploading documentaries
// Expects form-data with fields: 'thumbnail' and 'video'
router.post(
  '/upload',
  protect, // Token required
  mediaUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  uploadDocumentary
);

// Public route for fetching documentaries
router.get('/', getDocumentaries);

module.exports = router;