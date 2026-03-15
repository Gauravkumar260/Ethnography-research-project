import Story from '../models/Story';

class StoryService {
    async findAll(query: Record<string, any>) {
        return await Story.find(query).sort({ createdAt: -1 });
    }

    async findById(id: string) {
        return await Story.findById(id);
    }

    async create(data: Record<string, any>) {
        const story = new Story(data);
        return await story.save();
    }
}

export default new StoryService();
