const express = require('express');
const router = express.Router();

// 1. Import Middleware
const { protect, authorize } = require('../middlewares/authMiddleware');

// TEMPORARY: Dummy upload to prevent crashes if multer is missing
// You can uncomment the real one once you set up file uploads
const documentUpload = { single: () => (req, res, next) => next() }; 

// 2. Import Controllers
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

// ✅ NEW: Handle the Root Route (Fixes 404 on /api/research)
// This maps "GET /" to the Public Gallery function
router.get('/', getPublicResearch);

// Landing Page Stats
router.get('/stats', getResearchStats);

// Public Gallery (Alternative URL)
router.get('/public', getPublicResearch);

// Submit Research (Student)
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

module.exports = router;