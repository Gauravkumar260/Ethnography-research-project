import mongoose from 'mongoose';

const documentarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
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
      type: String, // Path to uploaded video
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Documentary as any) || mongoose.model('Documentary', documentarySchema);