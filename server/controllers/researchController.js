const Research = require('../models/Research');

// ==========================================
// 1. SUBMIT RESEARCH (Student)
// ==========================================
// @desc    Upload a new thesis/project
// @route   POST /api/research/submit
// @access  Private (Student)
const submitResearch = async (req, res) => {
  try {
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

    // 2. Handle Keywords safely
    let keywordsArray = [];
    if (req.body.keywords && typeof req.body.keywords === 'string') {
      keywordsArray = req.body.keywords.split(',').map((key) => key.trim());
    } else if (Array.isArray(req.body.keywords)) {
      keywordsArray = req.body.keywords;
    }

    // 3. Create the new Research Object
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
      type: req.body.type,        // e.g., 'thesis', 'publication'
      keywords: keywordsArray,    // Saved as an Array
      
      fileUrl: mainFile.path,
      ethicsFileUrl: ethicsFile.path,
      mediaFileUrl: mediaFile ? mediaFile.path : undefined,
      
      status: 'pending'           // Default status
    });

    // 4. Save to Database
    const savedResearch = await submission.save();
    
    // 5. Respond to Client
    res.status(201).json({ 
      success: true,
      message: 'Research submitted successfully!', 
      data: savedResearch 
    });

  } catch (error) {
    console.error("Error in submitResearch:", error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// ==========================================
// 2. GET ALL SUBMISSIONS (Admin)
// ==========================================
// @desc    View all projects (Pending, Approved, Rejected)
// @route   GET /api/research/admin
// @access  Private (Admin)
const getAllSubmissions = async (req, res) => {
  try {
    // Fetch all documents, sorted by newest first
    const submissions = await Research.find().sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ==========================================
// 3. GET PUBLIC RESEARCH (Everyone)
// ==========================================
// @desc    View ONLY Approved projects
// @route   GET /api/research/public
// @access  Public
const getPublicResearch = async (req, res) => {
  try {
    // Filter: status must be 'approved' (Note: Case insensitive match usually safer, but sticking to your schema)
    const research = await Research.find({ status: 'approved' }).sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: research.length, data: research });
  } catch (error) {
    console.error("Error in getPublicResearch:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ==========================================
// 4. UPDATE STATUS (Admin)
// ==========================================
// @desc    Approve or Reject a project
// @route   PATCH /api/research/:id/status
// @access  Private (Admin)
const updateStatus = async (req, res) => {
  try {
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

  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ==========================================
// 5. GET RESEARCH STATS (Landing Page)
// ==========================================
// @desc    Get counts for visualization
// @route   GET /api/research/stats
// @access  Public
const getResearchStats = async (req, res) => {
  try {
    const totalCount = await Research.countDocuments();
    const approvedCount = await Research.countDocuments({ status: 'Approved' });
    
    // Mock stats for visualization (can be replaced with real aggregations)
    const stats = {
      settlement: [
        { label: 'Permanent', value: 45, icon: '🏠' },
        { label: 'Nomadic', value: 25, icon: '🚶' }
      ],
      migration: { seasonal: 65, permanent: 15 },
      totalEntries: totalCount,
      publishedPapers: approvedCount
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export ALL functions to be used in Routes
module.exports = {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus, 
  getResearchStats // ✅ Added this so your Routes file won't crash
};