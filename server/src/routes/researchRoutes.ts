import express from 'express';
const router = express.Router();

// 1. Import Middleware
import {  protect, authorize  } from '../middlewares/authMiddleware';

// File Upload Middleware
import {  dataUpload  } from '../middlewares/uploadMiddleware'; 

// 2. Import Controllers
import {  
  submitResearch, 
  getAllSubmissions, 
  getPublicResearch, 
  updateStatus,
  getResearchStats
 } from '../controllers/researchController';

// ==========================================
// PUBLIC ROUTES
// ==========================================

// ✅ NEW: Handle the Root Route (Fixes 404 on /api/research)
// This maps "GET /" to the Public Gallery function
router.get('/', getPublicResearch);

// Landing Page Stats
router.get('/stats', getResearchStats);

// Public Gallery (Alternative URL)
router.get('/public', getPublicResearch);

// ==========================================
// PROTECTED ROUTES (Student/Admin Only)
// ==========================================

// Submit Research (Student)
// FIX: Added 'protect' and 'authorize' to prevent unauthenticated file uploads
router.post('/submit', 
  protect, 
  authorize('STUDENT', 'ADMIN'),
  dataUpload.fields([
    { name: 'mainFile', maxCount: 1 },
    { name: 'mediaFile', maxCount: 1 },
    { name: 'ethicsFile', maxCount: 1 }
  ]), 
  submitResearch
);

// ==========================================
// ADMIN ROUTES
// ==========================================

// View All (Admin)
router.get('/admin', protect, authorize('ADMIN'), getAllSubmissions);

// Update Status (Admin)
router.patch('/:id/status', protect, authorize('ADMIN'), updateStatus);

// Test Route
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: "Research Routes Working" });
});

export default router;