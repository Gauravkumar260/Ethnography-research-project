import Research from '../models/Research';
import communityService from './communityService';

class ResearchService {
    async create(data: Record<string, any>) {
        // Enforce pending status for non-admins if not already handled by controller
        const submission = new Research(data);
        const saved = await submission.save();

        if (data.status === 'approved') {
            await communityService.updateResearchCount(data.community);
        }

        return saved;
    }

    /**
     * Finds all research, implicitly filtering for approved status
     * unless an admin context is provided.
     */
    async findAll(query: Record<string, any> = {}, user?: any) {
        const secureQuery = { ...query };

        // Root Cause Fix: Secure by Default access control
        if (!user || (user.role !== 'admin' && user.role !== 'super_admin' && user.role !== 'department_admin')) {
            secureQuery.status = 'approved';
        }

        return await Research.find(secureQuery).sort({ createdAt: -1 });
    }

    async findApproved() {
        return await Research.find({ status: 'approved' }).sort({ createdAt: -1 });
    }

    async updateStatus(id: string, update: Record<string, any>) {
        const oldResearch = await Research.findById(id);
        const updatedResearch = await Research.findByIdAndUpdate(id, update, { new: true });

        if (updatedResearch) {
            await communityService.updateResearchCount(updatedResearch.community);
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
