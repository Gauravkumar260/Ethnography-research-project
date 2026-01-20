const express = require('express');
const router = express.Router();
const { getFieldData, uploadFieldData } = require('../controllers/fieldDataController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware'); // Use your improved uploader

// Public: Get List
router.get('/', getFieldData);

// Protected: Upload (Admin/Faculty only)
router.post('/upload', protect, upload.single('file'), uploadFieldData);

module.exports = router;