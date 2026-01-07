const Community = require('../models/Community');
const Research = require('../models/Research');
// const Documentary = require('../models/Documentary'); // Uncomment when you have this model

// ==========================================
// 1. PUBLIC: GET ALL COMMUNITIES (Grid View)
// ==========================================
// @desc    Get active communities with optimized fields for cards
// @route   GET /api/communities
const getCommunities = async (req, res) => {
  try {
    // Fetch only active communities and select specific fields for performance
    const communities = await Community.find({ status: 'active' })
      .select('name slug subtitle location thumbnail heroImage region') // <--- OPTIMIZATION
      .sort({ name: 1 });

    // Send response
    res.status(200).json({
      success: true,
      count: communities.length,
      data: communities,
    });
  } catch (error) {
    console.error("Error in getCommunities:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 2. PUBLIC: GET SINGLE COMMUNITY (Detail View)
// ==========================================
// @desc    Get full details + Live Counts
// @route   GET /api/communities/:slug
const getCommunityBySlug = async (req, res) => {
  try {
    // 1. Find the community by its URL slug
    const community = await Community.findOne({ 
      slug: req.params.slug,
      status: 'active' 
    });

    // Check if community exists
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // 2. LIVE COUNT: Check for approved research papers
    // This ensures the "Research Count" badge is always accurate
    const researchCount = await Research.countDocuments({
      community: community.name,
      status: 'approved',
    });

    // 3. Update the stats in the database (optional, but keeps DB fresh)
    community.researchCount = researchCount;
    // community.documentaryCount = await Documentary.countDocuments({...}); 
    await community.save();

    // Send response
    res.status(200).json({
      success: true,
      data: community,
    });

  } catch (error) {
    console.error("Error in getCommunityBySlug:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 3. PUBLIC: GET COMMUNITY STATS (Missing Function)
// ==========================================
// @desc    Get statistics for a specific community
// @route   GET /api/communities/:slug/stats
const getCommunityStats = async (req, res) => {
  try {
    // Logic to get stats (Placeholder for now to prevent crash)
    const community = await Community.findOne({ slug: req.params.slug });
    
    if (!community) {
        return res.status(404).json({ message: 'Community not found' });
    }

    // Example stats response
    res.status(200).json({
        success: true,
        data: {
            researchCount: community.researchCount || 0,
            population: community.population || 0,
            // Add other stats here
        }
    });
  } catch (error) {
    console.error("Error in getCommunityStats:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 4. ADMIN: CREATE COMMUNITY
// ==========================================
// @desc    Add a new tribe
// @route   POST /api/communities
const createCommunity = async (req, res) => {
  try {
    const newCommunity = await Community.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newCommunity,
    });
  } catch (error) {
    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
        return res.status(400).json({ message: 'Community name/slug must be unique' });
    }
    console.error("Error in createCommunity:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 5. ADMIN: UPDATE COMMUNITY
// ==========================================
// @desc    Edit details
// @route   PUT /api/communities/:id
const updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.status(200).json({
      success: true,
      data: community,
    });
  } catch (error) {
    console.error("Error in updateCommunity:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 6. ADMIN: DELETE COMMUNITY
// ==========================================
// @route   DELETE /api/communities/:id
const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    await community.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Community deleted successfully',
    });
  } catch (error) {
    console.error("Error in deleteCommunity:", error);
    res.status(500).json({ message: 'Server Error' });
  }
  
};

// Export all functions
module.exports = {
  getCommunities,     // Renamed from getAllCommunities
  getCommunityBySlug,
  getCommunityStats,  // Added this new function
  createCommunity,
  updateCommunity,
  deleteCommunity
};