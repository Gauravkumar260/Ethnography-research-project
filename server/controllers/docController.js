const Documentary = require('../models/Documentary');

// @desc    Upload a new Documentary
// @route   POST /api/docs/upload
const uploadDocumentary = async (req, res) => {
  try {
    // req.files is created by Multer middleware
    const { title, description, duration, category, studentName } = req.body;

    // Validation: Ensure files exist
    if (!req.files || !req.files.thumbnail || !req.files.video) {
      return res.status(400).json({ message: 'Please upload both a thumbnail and a video file.' });
    }

    const newDoc = new Documentary({
      title,
      description,
      duration,
      // Handle category if it comes as a string (from FormData) or array
      category: typeof category === 'string' ? category.split(',') : category,
      studentName,
      thumbnailUrl: req.files.thumbnail[0].path,
      videoUrl: req.files.video[0].path,
      status: 'pending'
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Server Error during upload' });
  }
};

// @desc    Get All Approved Documentaries (Public)
// @route   GET /api/docs
const getDocumentaries = async (req, res) => {
  try {
    const docs = await Documentary.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  uploadDocumentary,
  getDocumentaries
};