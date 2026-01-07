const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    communityId: { 
      type: String, 
      required: true, 
      index: true // Faster lookup by community
    },
    title: { type: String, required: true },
    storyType: { 
      type: String, 
      enum: ['oral_history', 'migration', 'craft', 'ritual', 'folklore'], 
      required: true 
    },
    content: { type: String, required: true }, // The text of the story
    narrator: { type: String }, // Who told the story?
    recordedBy: { type: String }, // Which student/researcher recorded it?
    recordedDate: { type: Date },
    
    // Optional Media
    audioUrl: { type: String }, // Path to audio file
    transcriptUrl: { type: String }, // Path to full PDF transcript
    
    tags: [String],
    status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'published' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);