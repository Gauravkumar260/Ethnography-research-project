export interface ResearchItem {
    _id: string;
    type: string;
    title: string;
    studentName: string;
    studentId?: string;
    program?: string;
    batch?: string;
    mentor?: string;
    abstract?: string;
    community?: string;
    keywords?: string;
    fileUrl?: string; // Path to file on server
    mediaUrl?: string;
    createdAt: string;
    updatedAt?: string;
}
