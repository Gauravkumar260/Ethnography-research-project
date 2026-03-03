import express from 'express';
const router = express.Router();
import {  
  uploadDocumentary, 
  getDocumentaries, 
  approveDocumentary, 
  deleteDocumentary,
  getAllDocumentariesAdmin 
 } from '../controllers/docController';
import {  mediaUpload  } from '../middlewares/uploadMiddleware'; 
import {  protect, authorize  } from '../middlewares/authMiddleware';

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
router.get('/admin/all', protect, authorize('ADMIN'), getAllDocumentariesAdmin);
router.patch('/approve/:id', protect, authorize('ADMIN'), approveDocumentary);
router.delete('/:id', protect, authorize('ADMIN'), deleteDocumentary);

export default router;