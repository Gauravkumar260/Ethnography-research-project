const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
  {
    // ==========================================
    // 1. IDENTITY & META
    // ==========================================
    name: { 
      type: String, 
      required: [true, 'Community name is required'], 
      unique: true, 
      trim: true 
    },
    slug: { 
      type: String, 
      unique: true, 
      lowercase: true 
      // Auto-generated via pre-save hook
    },
    subtitle: { 
      type: String 
    },

    // ==========================================
    // 2. DEMOGRAPHICS & LOCATION
    // ==========================================
    region: { type: String, required: true },
    state: { type: String, required: true },
    location: { type: String },
    mapCoordinates: {
      latitude: Number,
      longitude: Number
    },
    population: { type: String },
    language: { type: String },
    primaryLivelihood: { type: String },

    // ==========================================
    // 3. MEDIA & ASSETS
    // ==========================================
    heroImage: { type: String, required: true },   // Main Landscape Photo
    thumbnail: { type: String },                   // Small Grid Photo
    posterImage: { type: String },                 // Illustrated Character (Vertical)
    galleryImages: [{ type: String }],             // Array of extra photos
    documentaryVideoUrl: { type: String },

    // ==========================================
    // 4. DESIGN SYSTEM (For Frontend Styling)
    // ==========================================
    attire: {
      gender: { type: String },
      upperGarment: { type: String },
      lowerGarment: { type: String },
      drape: { type: String },
      jewellery: { type: String },
      head: { type: String }
    },

    palette: {
      primary: [{ type: String }], // Array of hex codes e.g. ['#7C1D2A', '#B4373F']
      accents: [{ type: String }],
      background: { type: String },
      text: { type: String }
    },

    designNotes: {
      style: { type: String },
      pose: { type: String },
      typography: { type: String }
    },

    // ==========================================
    // 5. NARRATIVE CONTENT
    // ==========================================
    intro: { type: String },         // Short summary
    description: { type: String },   // SEO Tag
    
    sections: {
      history: { 
        title: { type: String, default: 'History' },
        content: { type: String } 
      },
      lifestyle: { 
        title: { type: String, default: 'Lifestyle' },
        content: { type: String } 
      },
      craft: { 
        title: { type: String, default: 'Craft' },
        content: { type: String } 
      },
      culture: { 
        title: { type: String, default: 'Culture' },
        content: { type: String } 
      }
    },
    
    insights: [{ type: String }],
    futureDirection: { type: String },

    // ==========================================
    // 6. INFOGRAPHIC DATA
    // ==========================================
    timeline: [{
      year: { type: String },
      event: { type: String },
      description: { type: String }
    }],

    statistics: {
      settlement: [{
        label: { type: String },   // e.g., "Permanent Villages"
        value: { type: Number },   // e.g., 90
        icon: { type: String }     // e.g., "🏠"
      }],
      migration: {
        type: Map,       // Flexible Key-Value pairs
        of: String       // e.g., { "Frequency": "Seasonal", "Reason": "Trade" }
      }
    },

    aspirations: [{
      goal: { type: String },
      interest: { type: Number }, // Percentage 0-100
      icon: { type: String }
    }],

    // ==========================================
    // 7. ANALYTICS & ADMIN
    // ==========================================
    researchCount: { type: Number, default: 0 },
    documentaryCount: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'active' 
    }
  },
  { timestamps: true }
);

// --- Middleware: Auto-generate Slug ---
communitySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }
  next();
});

module.exports = mongoose.model('Community', communitySchema);