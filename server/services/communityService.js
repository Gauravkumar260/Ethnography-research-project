const Community = require('../models/Community');
const Research = require('../models/Research');
// const Documentary = require('../models/Documentary');

/**
 * Service for Community-related business logic.
 */
class CommunityService {
  /**
   * Get all active communities with optimized field selection.
   * @returns {Promise<Array>} List of communities
   */
  async getActiveCommunities() {
    return await Community.find({ status: 'active' })
      .select('name slug subtitle location thumbnail heroImage region')
      .sort({ name: 1 });
  }

  /**
   * Get a single community by slug, including live research counts.
   * @param {string} slug - The community slug
   * @returns {Promise<Object>} Community document or null
   */
  async getCommunityBySlug(slug) {
    const community = await Community.findOne({
      slug: slug,
      status: 'active'
    });

    if (!community) {
      return null;
    }

    // Live Count: Check for approved research papers
    const researchCount = await Research.countDocuments({
      community: community.name,
      status: 'approved',
    });

    // Update stats in DB (Side-effect business logic)
    if (community.researchCount !== researchCount) {
        community.researchCount = researchCount;
        await community.save();
    }

    return community;
  }

  /**
   * Create a new community.
   * @param {Object} data - Community data
   * @returns {Promise<Object>} Created community
   */
  async createCommunity(data) {
    return await Community.create(data);
  }

  /**
   * Update an existing community.
   * @param {string} id - Community ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated community or null
   */
  async updateCommunity(id, data) {
    return await Community.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete a community.
   * @param {string} id - Community ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteCommunity(id) {
    const community = await Community.findById(id);
    if (!community) {
      return false;
    }
    await community.deleteOne();
    return true;
  }
}

module.exports = new CommunityService();
