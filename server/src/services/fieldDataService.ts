import FieldData from '../models/FieldData';

class FieldDataService {
    async findAll(query: Record<string, any>) {
        return await FieldData.find(query).sort({ createdAt: -1 });
    }

    async create(data: Record<string, any>) {
        const fieldData = new FieldData(data);
        return await fieldData.save();
    }
}

export default new FieldDataService();
