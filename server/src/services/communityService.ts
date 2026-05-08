import Community from '../models/Community';
import Research from '../models/Research';
import { cache } from '../lib/cache';
// import Documentary from '../models/Documentary';

const CACHE_KEY_ACTIVE = 'cache:communities:active';

/**
 * Service for Community-related business logic.
 */
class CommunityService {
  /**
   * Get all active communities with optimized field selection.
   * @returns {Promise<Array>} List of communities
   */
  async getActiveCommunities() {
    const cachedData = await cache.get<any[]>(CACHE_KEY_ACTIVE);
    if (cachedData) {
      return cachedData;
    }

    const communities = await Community.find({ status: 'active' })
      .select('name slug subtitle location thumbnail heroImage region')
      .sort({ name: 1 });

    await cache.set(CACHE_KEY_ACTIVE, communities, 120);
    return communities;
  }

  /**
   * Get a single community by slug, including live research counts.
   * @param {string} slug - The community slug
   * @returns {Promise<Object>} Community document or null
   */
  async getCommunityBySlug(slug: string) {
    return await Community.findOne({
      slug: slug,
      status: 'active'
    });
  }

  /**
   * Update the research count for a community based on approved research papers.
   * @param {string} communityName - The name of the community
   */
  async updateResearchCount(communityName: string) {
    const researchCount = await Research.countDocuments({
      community: communityName,
      status: 'approved',
    });

    await Community.updateOne(
      { name: communityName },
      { $set: { researchCount } }
    );
  }

  /**
   * Create a new community.
   * @param {Object} data - Community data
   * @returns {Promise<Object>} Created community
   */
  async createCommunity(data) {
    const community = await Community.create(data);
    await cache.del(CACHE_KEY_ACTIVE);
    return community;
  }

  /**
   * Update an existing community.
   * @param {string} id - Community ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated community or null
   */
  async updateCommunity(id, data) {
    const community = await Community.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    if (community) {
      await cache.del(CACHE_KEY_ACTIVE);
    }
    return community;
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
    await cache.del(CACHE_KEY_ACTIVE);
    return true;
  }
}

export default new CommunityService();
