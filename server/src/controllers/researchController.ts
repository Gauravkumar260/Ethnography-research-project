// @ts-nocheck
import asyncHandler from 'express-async-handler';
import Research from '../models/Research';

// ==========================================
// 1. SUBMIT RESEARCH (Student)
// ==========================================
// @desc    Upload a new thesis/project
// @route   POST /api/research/submit
// @access  Private (Student)
const submitResearch = asyncHandler(async (req, res) => {
  // 1. Check if files were uploaded via Multer
  const files = req.files || {};
  
  // Extract file paths
  const mainFile = files['mainFile'] ? files['mainFile'][0] : null;
  const mediaFile = files['mediaFile'] ? files['mediaFile'][0] : null;
  const ethicsFile = files['ethicsFile'] ? files['ethicsFile'][0] : null;

  if (!mainFile) {
      return res.status(400).json({ success: false, message: 'Main research document is required.' });
  }
  if (!ethicsFile) {
      return res.status(400).json({ success: false, message: 'Ethics approval document is required.' });
  }

  // 2. Validate Required Text Fields (Fail early)
  const requiredFields = ['studentName', 'studentId', 'email', 'program', 'mentor', 'title', 'abstract', 'community', 'type'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ success: false, message: `Field '${field}' is required.` });
    }
  }

  // 3. Handle Keywords safely
  let keywordsArray = [];
  if (req.body.keywords && typeof req.body.keywords === 'string') {
    keywordsArray = req.body.keywords.split(',').map((key) => key.trim());
  } else if (Array.isArray(req.body.keywords)) {
    keywordsArray = req.body.keywords;
  }

  // 4. Create the new Research Object
  // Convert backslashes to forward slashes for URL compatibility
  const submission = new Research({
    studentName: req.body.studentName,
    studentId: req.body.studentId,
    email: req.body.email,
    program: req.body.program,
    batch: req.body.batch,
    mentor: req.body.mentor,
    
    title: req.body.title,
    abstract: req.body.abstract,
    community: req.body.community,
    type: req.body.type,        
    keywords: keywordsArray,    
    
    fileUrl: mainFile.path.replace(/\\/g, '/'),
    ethicsFileUrl: ethicsFile.path.replace(/\\/g, '/'),
    mediaFileUrl: mediaFile ? mediaFile.path.replace(/\\/g, '/') : undefined,
    
    status: 'pending'           
  });

  // 5. Save to Database
  const savedResearch = await submission.save();
  
  // 6. Respond to Client
  res.status(201).json({ 
    success: true,
    message: 'Research submitted successfully!', 
    data: savedResearch 
  });
});

// ==========================================
// 2. GET ALL SUBMISSIONS (Admin)
// ==========================================
// @desc    View all projects (Pending, Approved, Rejected)
// @route   GET /api/research/admin
// @access  Private (Admin)
const getAllSubmissions = asyncHandler(async (req, res) => {
  // Fetch all documents, sorted by newest first
  const submissions = await Research.find().sort({ createdAt: -1 });
  
  res.status(200).json({ success: true, count: submissions.length, data: submissions });
});

// ==========================================
// 3. GET PUBLIC RESEARCH (Everyone)
// ==========================================
// @desc    View ONLY Approved projects
// @route   GET /api/research/public
// @access  Public
const getPublicResearch = asyncHandler(async (req, res) => {
  // Filter: status must be 'approved'
  const research = await Research.find({ status: 'approved' }).sort({ createdAt: -1 });
  
  res.status(200).json({ success: true, count: research.length, data: research });
});

// ==========================================
// 4. UPDATE STATUS (Admin)
// ==========================================
// @desc    Approve or Reject a project
// @route   PATCH /api/research/:id/status
// @access  Private (Admin)
const updateStatus = asyncHandler(async (req, res) => {
  const { status, comments } = req.body; 

  // Find by ID and Update
  const updatedResearch = await Research.findByIdAndUpdate(
    req.params.id,
    { 
      status: status,
      rejectionReason: comments || '', // Save reason if rejected/revision
      reviewedDate: new Date()         // Mark the time of review
    },
    { new: true } // Return the updated document
  );

  if (!updatedResearch) {
    return res.status(404).json({ success: false, message: 'Research not found' });
  }

  res.status(200).json({ 
      success: true,
      message: `Research marked as ${status}`, 
      data: updatedResearch 
  });
});

// ==========================================
// 5. GET RESEARCH STATS (Landing Page)
// ==========================================
// @desc    Get counts for visualization
// @route   GET /api/research/stats
// @access  Public
const getResearchStats = asyncHandler(async (req, res) => {
  // Aggregation: Count approved items by type
  const typeStats = await Research.aggregate([
    { $match: { status: 'approved' } }, 
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);

  // Format as key-value pairs
  const countsByType = {};
  typeStats.forEach(item => {
      if (item._id) countsByType[item._id.toLowerCase()] = item.count;
  });

  const totalCount = await Research.countDocuments();
  const approvedCount = await Research.countDocuments({ status: 'approved' });
  
  // Stats for visualization
  const stats = {
    byType: countsByType,
    settlement: [
      { label: 'Permanent', value: 45, icon: '🏠' },
      { label: 'Nomadic', value: 25, icon: '🚶' }
    ],
    migration: { seasonal: 65, permanent: 15 },
    totalEntries: totalCount,
    publishedPapers: approvedCount
  };

  res.status(200).json({ success: true, data: stats });
});

// Export ALL functions
export { 
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus, 
  getResearchStats
 };