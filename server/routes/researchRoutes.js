const express = require('express');
const router = express.Router();

// 1. Import Controllers
const {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus,
  getResearchStats // Optional: if you kept this function for the landing page
} = require('../controllers/researchController');

// 2. Import Middlewares
const { protect, authorize } = require('../middlewares/authMiddleware'); // Security
const { documentUpload } = require('../middlewares/uploadMiddleware');   // File Handling

// ==========================================
// A. PUBLIC ROUTES (No Login Required)
// ==========================================

// @route   GET /api/research/public
// @desc    Fetch only "Approved" research for the frontend gallery
router.get('/public', getPublicResearch);

// @route   GET /api/research/stats
// @desc    Get counts (e.g., "50+ Papers Published") - Optional
router.get('/stats', getResearchStats);

// @route   POST /api/research/submit
// @desc    Student submits research (Handles file upload 'file')
// Note: 'file' must match the name attribute in your frontend form <input name="file" />
router.post('/submit', documentUpload.single('file'), submitResearch);


// ==========================================
// B. PROTECTED ROUTES (Admin Only)
// ==========================================

// @route   GET /api/research/admin
// @desc    View ALL submissions (Pending, Rejected, Approved)
// Security: Must be Logged In + Must be Admin
router.get('/admin', protect, authorize('admin'), getAllSubmissions);

// @route   PATCH /api/research/:id/status
// @desc    Approve or Reject a submission
// Security: Must be Logged In + Must be Admin
router.patch('/:id/status', protect, authorize('admin'), updateStatus);

// @route   GET /api/research/test
// @desc    Simple check to see if routes are loading
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: "Research Routes Working" });
});

module.exports = router;
