import Documentary from '../models/Documentary';

class DocService {
    async create(data: Record<string, any>) {
        const doc = new Documentary(data);
        return await doc.save();
    }

    async findApproved() {
        return await Documentary.find({ status: 'approved' }).sort({ createdAt: -1 });
    }

    async findById(id: string) {
        return await Documentary.findById(id);
    }

    async findAll() {
        return await Documentary.find({}).sort({ createdAt: -1 });
    }

    async approve(id: string) {
        const doc = await Documentary.findById(id);
        if (!doc) return null;
        doc.status = 'approved';
        await doc.save();
        return doc;
    }

    async delete(id: string) {
        const doc = await Documentary.findById(id);
        if (!doc) return false;
        await doc.deleteOne();
        return true;
    }
}

export default new DocService();
