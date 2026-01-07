const mongoose = require('mongoose');

const documentarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    duration: {
      type: String, // e.g. "28 min"
      required: true,
    },
    category: {
      type: [String], // Array of strings like ['craft', 'nomadic']
      required: true,
    },
    thumbnailUrl: {
      type: String, // Path to the uploaded image
      required: true,
    },
    videoUrl: {
      type: String, // Path to uploaded video OR YouTube link
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending', // pending, approved, rejected
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Documentary', documentarySchema);