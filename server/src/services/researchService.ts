import Research from '../models/Research';
import communityService from './communityService';

class ResearchService {
    async create(data: Record<string, any>) {
        const submission = new Research(data);
        const saved = await submission.save();

        // If it's created with approved status (unlikely but possible), update count
        if (data.status === 'approved') {
            await communityService.updateResearchCount(data.community);
        }

        return saved;
    }

    async findAll(sort = { createdAt: -1 as const }) {
        return await Research.find().sort(sort);
    }

    async findApproved() {
        return await Research.find({ status: 'approved' }).sort({ createdAt: -1 });
    }

    async updateStatus(id: string, update: Record<string, any>) {
        const oldResearch = await Research.findById(id);
        const updatedResearch = await Research.findByIdAndUpdate(id, update, { new: true });

        if (updatedResearch) {
            // Trigger research count update for the new community
            await communityService.updateResearchCount(updatedResearch.community);

            // If the community name was changed, update the old one too
            if (oldResearch && oldResearch.community !== updatedResearch.community) {
                await communityService.updateResearchCount(oldResearch.community);
            }
        }

        return updatedResearch;
    }

    async delete(id: string) {
        const research = await Research.findById(id);
        if (!research) return false;

        const communityName = research.community;
        await research.deleteOne();

        // Trigger research count update for the community
        await communityService.updateResearchCount(communityName);

        return true;
    }

    async getStatsByType() {
        return await Research.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);
    }

    async countAll() {
        return await Research.countDocuments();
    }

    async countApproved() {
        return await Research.countDocuments({ status: 'approved' });
    }
}

export default new ResearchService();
