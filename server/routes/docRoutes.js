const express = require('express');
const router = express.Router();
const { uploadDocumentary, getDocumentaries } = require('../controllers/docController');
const { mediaUpload } = require('../middlewares/uploadMiddleware'); // CHANGED ✅
const { protect } = require('../middlewares/authMiddleware');

// Protected route for uploading documentaries
router.post(
  '/upload',
  protect, // NOW PROTECTED ✅
  mediaUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  uploadDocumentary
);

// Public route for fetching documentaries
router.get('/', getDocumentaries);

module.exports = router;
