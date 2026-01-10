const express = require('express');
const router = express.Router();

// 1. Import Middlewares
const { protect, authorize } = require('../middlewares/authMiddleware');
// If you don't have upload middleware yet, comment this out or use a dummy
// const { documentUpload } = require('../middlewares/uploadMiddleware'); 
// TEMPORARY FIX: Dummy upload middleware if the real one is missing
const documentUpload = { single: () => (req, res, next) => next() }; 

// 2. Import Controllers (These match your Controller file exactly)
const { 
  submitResearch, 
  getAllSubmissions, 
  getPublicResearch, 
  updateStatus,
  getResearchStats
} = require('../controllers/researchController');

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Landing Page Stats
router.get('/stats', getResearchStats);

// Public Gallery
router.get('/public', getPublicResearch);

// Submit Research (Student)
// Note: We use the dummy upload for now to prevent crashes if multer isn't set up
router.post('/submit', documentUpload.single('file'), submitResearch);

// ==========================================
// ADMIN ROUTES
// ==========================================

// View All (Admin)
router.get('/admin', protect, authorize('admin'), getAllSubmissions);

// Update Status (Admin)
router.patch('/:id/status', protect, authorize('admin'), updateStatus);

// Test Route
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: "Research Routes Working" });
});

// ✅ CRITICAL: MUST EXPORT ROUTER
module.exports = router;