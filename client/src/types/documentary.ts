export interface Documentary {
    _id: string;
    title: string;
    description: string;
    duration: string;
    category: string[];
    thumbnailUrl: string;
    videoUrl: string;
    studentName: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt?: string;
}
