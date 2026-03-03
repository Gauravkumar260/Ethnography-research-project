const communityService = require('../services/communityService');

// ==========================================
// 1. PUBLIC: GET ALL COMMUNITIES (Grid View)
// ==========================================
// @desc    Get active communities with optimized fields for cards
// @route   GET /api/communities
const getCommunities = async (req, res) => {
  try {
    const communities = await communityService.getActiveCommunities();

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
    const community = await communityService.getCommunityBySlug(req.params.slug);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

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
// 3. PUBLIC: GET COMMUNITY STATS
// ==========================================
// @desc    Get statistics for a specific community
// @route   GET /api/communities/:slug/stats
const getCommunityStats = async (req, res) => {
  try {
    // Reusing getCommunityBySlug service for now as it contains the logic
    // In a full implementation, we might have a dedicated service method for lighter stats fetching
    const community = await communityService.getCommunityBySlug(req.params.slug);
    
    if (!community) {
        return res.status(404).json({ message: 'Community not found' });
    }

    res.status(200).json({
        success: true,
        data: {
            researchCount: community.researchCount || 0,
            population: community.population || 0,
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
    const newCommunity = await communityService.createCommunity(req.body);
    
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
    const community = await communityService.updateCommunity(req.params.id, req.body);

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
    const success = await communityService.deleteCommunity(req.params.id);

    if (!success) {
      return res.status(404).json({ message: 'Community not found' });
    }

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
  getCommunities,
  getCommunityBySlug,
  getCommunityStats,
  createCommunity,
  updateCommunity,
  deleteCommunity
};
