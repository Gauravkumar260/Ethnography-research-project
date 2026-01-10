const Research = require('../models/Research');

// @desc    Submit new research (Student)
// @route   POST /api/research/submit
const submitResearch = async (req, res) => {
  try {
    const { title, abstract, author, tags } = req.body;
    
    // Create entry (Status defaults to 'Pending' in model)
    const research = await Research.create({
      title,
      abstract,
      author,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      fileUrl: req.file ? req.file.path : null, // Assuming you use Cloudinary/Multer
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Research submitted successfully!',
      data: research
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ALL submissions (Admin)
// @route   GET /api/research/admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Research.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get only APPROVED research (Public)
// @route   GET /api/research/public
const getPublicResearch = async (req, res) => {
  try {
    // Filter by status: 'Approved'
    const approvedResearch = await Research.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: approvedResearch.length, data: approvedResearch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update submission status (Admin)
// @route   PATCH /api/research/:id/status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expecting 'Approved' or 'Rejected'
    const research = await Research.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!research) {
      return res.status(404).json({ success: false, message: 'Research not found' });
    }

    res.status(200).json({ success: true, data: research });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Research Statistics
// @route   GET /api/research/stats
const getResearchStats = async (req, res) => {
  try {
    const totalCount = await Research.countDocuments();
    const approvedCount = await Research.countDocuments({ status: 'Approved' });
    
    // Mock stats for visualization
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

// ✅ EXPORT EXACTLY WHAT THE ROUTE FILE NEEDS
module.exports = {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus,
  getResearchStats
};