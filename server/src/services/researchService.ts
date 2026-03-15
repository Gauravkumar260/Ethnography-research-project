import Research from '../models/Research';

class ResearchService {
    async create(data: Record<string, any>) {
        const submission = new Research(data);
        return await submission.save();
    }

    async findAll(sort = { createdAt: -1 as const }) {
        return await Research.find().sort(sort);
    }

    async findApproved() {
        return await Research.find({ status: 'approved' }).sort({ createdAt: -1 });
    }

    async updateStatus(id: string, update: Record<string, any>) {
        return await Research.findByIdAndUpdate(id, update, { new: true });
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
