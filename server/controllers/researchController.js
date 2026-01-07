const Research = require('../models/Research');

// ==========================================
// 1. SUBMIT RESEARCH (Student)
// ==========================================
// @desc    Upload a new thesis/project
// @route   POST /api/research/submit
// @access  Private (Student)
const submitResearch = async (req, res) => {
  try {
    // 1. Check if a file was actually uploaded via Multer
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a research file (PDF/DOC)' });
    }

    // 2. Handle Keywords: Convert "Java, AI, Web" string to Array ["Java", "AI", "Web"]
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
      
      fileUrl: req.file.path,     // Path provided by Multer
      status: 'pending'           // Default status
    });

    // 4. Save to Database
    const savedResearch = await submission.save();
    
    // 5. Respond to Client
    res.status(201).json({ 
      message: 'Research submitted successfully!', 
      data: savedResearch 
    });

  } catch (error) {
    console.error("Error in submitResearch:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
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
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    res.status(500).json({ message: 'Server Error' });
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
    // Filter: status must be 'approved'
    const research = await Research.find({ status: 'approved' })
                                   .sort({ createdAt: -1 });
    
    res.status(200).json(research);
  } catch (error) {
    console.error("Error in getPublicResearch:", error);
    res.status(500).json({ message: 'Server Error' });
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
    const { status, comments } = req.body; // Expecting: { status: 'rejected', comments: 'Abstract too short' }

    // Validate Status
    const validStatuses = ['approved', 'rejected', 'revision'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find by ID and Update
    const updatedResearch = await Research.findByIdAndUpdate(
      req.params.id,
      { 
        status: status,
        rejectionReason: comments || '', // Save reason if rejected/revision
        reviewedDate: new Date()         // Mark the time of review
      },
      { new: true } // Return the updated document to the frontend
    );

    if (!updatedResearch) {
      return res.status(404).json({ message: 'Research not found' });
    }

    res.status(200).json({ 
        message: `Research marked as ${status}`, 
        data: updatedResearch 
    });

  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export all functions to be used in Routes
module.exports = {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus, 
};