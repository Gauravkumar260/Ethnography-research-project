const express = require('express');
const router = express.Router();
const { getFieldData, uploadFieldData } = require('../controllers/fieldDataController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { dataUpload } = require('../middlewares/uploadMiddleware'); // Use the optimized uploader

// Public: Get List
router.get('/', getFieldData);

// Protected: Upload (Admin only)
router.post('/upload', protect, authorize('admin'), dataUpload.single('file'), uploadFieldData);

module.exports = router;