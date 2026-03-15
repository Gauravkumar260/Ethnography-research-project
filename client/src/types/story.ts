export interface Story {
    _id: string;
    communityId: string;
    title: string;
    storyType: 'oral_history' | 'migration' | 'craft' | 'ritual' | 'folklore';
    content: string;
    narrator?: string;
    recordedBy?: string;
    recordedDate?: string;
    audioUrl?: string;
    transcriptUrl?: string;
    tags?: string[];
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt?: string;
}
