const Documentary = require('../models/Documentary');

// @desc    Upload a new Documentary
// @route   POST /api/docs/upload
const uploadDocumentary = async (req, res) => {
  try {
    // req.files is created by Multer (we will set this up next)
    // We expect 2 files: 'thumbnail' and 'video'
    
    const { title, description, duration, category, studentName } = req.body;

    // Basic Validation
    if (!req.files || !req.files.thumbnail || !req.files.video) {
      return res.status(400).json({ message: 'Please upload both a thumbnail and a video file.' });
    }

    const newDoc = new Documentary({
      title,
      description,
      duration,
      category: category.split(','), // Convert "craft,tribal" string to array
      studentName,
      thumbnailUrl: req.files.thumbnail[0].path,
      videoUrl: req.files.video[0].path,
      status: 'pending'
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);

  } catch (error) {
    console.error(error);
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
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  uploadDocumentary,
  getDocumentaries
};