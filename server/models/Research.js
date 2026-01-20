const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema(
  {
    // --- Student & Mentor Details ---
    studentName: { 
      type: String, 
      required: [true, 'Student name is required'] 
    },
    studentId: { 
      type: String, 
      required: [true, 'Student ID is required'],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },
    program: { 
      type: String, 
      required: [true, 'Program is required'] // e.g., "BCA", "MCA"
    },
    batch: { 
      type: String // e.g., "2023-2026"
    },
    mentor: { 
      type: String,
      required: [true, 'Mentor name is required']
    },

    // --- Project Details ---
    title: { 
      type: String, 
      required: [true, 'Research title is required'],
      trim: true
    },
    abstract: { 
      type: String, 
      required: [true, 'Abstract is required'] 
    },
    community: { 
      type: String, 
      required: [true, 'Community/Domain is required'] // e.g., "Computer Science"
    },
    
    // --- Classification & Files ---
    type: { 
      type: String, 
      required: true,
      // Combined Enum: Supports all your frontend filters
      enum: [
        'thesis', 
        'publication', 
        'patent', 
        'dataset', 
        'interview', 
        'photo', 
        'survey', 
        'field_note', 
        'document'
      ] 
    },
    datasetSize: { 
      type: String // Optional: Specific for 'dataset' type (e.g., "1.2 GB")
    },
    keywords: {
      type: [String], // Array is better for search features
      default: []
    },
    fileUrl: { 
      type: String, 
      required: [true, 'File upload is required'] 
    },

    // --- Admin & Approval Workflow ---
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected', 'revision'], 
      default: 'pending' 
    },
    ethicsApproved: { 
      type: Boolean, 
      default: false 
    },
    rejectionReason: { 
      type: String // Only populated if status is 'rejected' or 'revision'
    },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' // Links to the Admin who reviewed it
    },
    reviewedDate: { 
      type: Date 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Research', researchSchema);