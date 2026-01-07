const mongoose = require('mongoose');

const fieldDataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['interview', 'photo', 'survey', 'field_note', 'document', 'dataset'],
      default: 'dataset'
    },
    community: { type: String, required: true }, // e.g., "Gadia Lohar"
    description: { type: String, required: true },
    researcher: { type: String, required: true },
    batch: { type: String }, // e.g., "PhD 2023-2024"
    datasetSize: { type: String }, // e.g., "2.4 GB"
    fileCount: { type: Number }, // e.g., 42
    fileUrl: { type: String, required: true }, // Path to ZIP or File
    accessLevel: { 
      type: String, 
      enum: ['public', 'restricted'], 
      default: 'public' 
    },
    downloadCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FieldData', fieldDataSchema);