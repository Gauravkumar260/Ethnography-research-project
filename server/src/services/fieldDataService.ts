import FieldData from '../models/FieldData';

class FieldDataService {
    /**
     * Finds all field data, implicitly filtering for public access 
     * unless an admin context is provided.
     */
    async findAll(query: Record<string, any> = {}, user?: any) {
        const secureQuery = { ...query };

        // Root Cause Fix: Secure by Default access control
        if (!user || (user.role !== 'admin' && user.role !== 'super_admin' && user.role !== 'department_admin')) {
            secureQuery.accessLevel = 'public';
        }

        return await FieldData.find(secureQuery).sort({ createdAt: -1 });
    }

    async create(data: Record<string, any>) {
        const fieldData = new FieldData(data);
        return await fieldData.save();
    }
}

export default new FieldDataService();
