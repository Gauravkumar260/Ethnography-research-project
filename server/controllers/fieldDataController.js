const FieldData = require('../models/FieldData');

// @desc    Get all field data (with optional filtering)
// @route   GET /api/field-data
const getFieldData = async (req, res) => {
  try {
    const { type, community } = req.query;
    let query = {};

    if (type && type !== 'all') {
      query.type = type;
    }
    if (community) {
      query.community = community;
    }

    const data = await FieldData.find(query).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Upload new field data (Protected)
// @route   POST /api/field-data/upload
const uploadFieldData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const newData = new FieldData({
      ...req.body,
      fileUrl: req.file.path,
    });

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getFieldData, uploadFieldData };