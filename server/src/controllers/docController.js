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

    // Fix: Handle category safely
    let categories = [];
    if (typeof category === 'string') {
        categories = category.split(',').map(c => c.trim());
    } else if (Array.isArray(category)) {
        categories = category;
    }

    const newDoc = new Documentary({
      title,
      description,
      duration,
      category: categories,
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
    // Filter by status 'approved'
    const filter = { status: 'approved' };
    
    const docs = await Documentary.find(filter).sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Approve a Documentary (Admin)
// @route   PATCH /api/docs/approve/:id
const approveDocumentary = async (req, res) => {
    try {
        const doc = await Documentary.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: 'Documentary not found' });
        }

        doc.status = 'approved';
        await doc.save();

        res.status(200).json(doc);
    } catch (error) {
        console.error("Approval Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a Documentary (Admin)
// @route   DELETE /api/docs/:id
const deleteDocumentary = async (req, res) => {
    try {
        const doc = await Documentary.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ message: 'Documentary not found' });
        }

        await doc.deleteOne();

        res.status(200).json({ message: 'Documentary removed' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get All Documentaries (Admin - Pending & Approved)
// @route   GET /api/docs/admin/all
const getAllDocumentariesAdmin = async (req, res) => {
    try {
        const docs = await Documentary.find({}).sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        console.error("Admin Fetch Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
  uploadDocumentary,
  getDocumentaries,
  approveDocumentary,
  deleteDocumentary,
  getAllDocumentariesAdmin
};
