const express = require('express');
const router = express.Router();

// 1. Import Controllers
const {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus,
} = require('../controllers/researchController');

// 2. Import Middlewares
const { protect } = require('../middlewares/authMiddleware'); // For Admin security
const { documentUpload } = require('../middlewares/uploadMiddleware'); // For File Uploads

// ==========================================
// PUBLIC ROUTES (No Login Required)
// ==========================================

// @route   GET /api/research/public
// @desc    Fetch only "Approved" research for the frontend gallery
router.get('/public', getPublicResearch);

// @route   POST /api/research/submit
// @desc    Student submits research (Handles file upload 'file')
// Note: If you want only logged-in students to submit, move this to Protected Routes.
router.post('/submit', documentUpload.single('file'), submitResearch);


// ==========================================
// PROTECTED ROUTES (Admin Token Required)
// ==========================================

// @route   GET /api/research/admin
// @desc    View ALL submissions (Pending, Rejected, Approved)
router.get('/admin', protect, getAllSubmissions);

// @route   PATCH /api/research/:id/status
// @desc    Approve or Reject a submission
router.patch('/:id/status', protect, updateStatus);

module.exports = router;