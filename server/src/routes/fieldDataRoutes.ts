import express from 'express';
const router = express.Router();
import {  getFieldData, uploadFieldData  } from '../controllers/fieldDataController';
import {  protect, authorize  } from '../middlewares/authMiddleware';
import {  dataUpload  } from '../middlewares/uploadMiddleware'; // Use the optimized uploader

// Public: Get List
router.get('/', getFieldData);

// Protected: Upload (Admin only)
router.post('/upload', protect, authorize('ADMIN'), dataUpload.single('file'), uploadFieldData);

export default router;