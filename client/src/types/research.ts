export interface ResearchItem {
    _id: string;
    studentName: string;
    studentId: string;
    email: string;
    program: string;
    batch: string;
    mentor: string;
    title: string;
    abstract: string;
    community: string;
    type: string;
    datasetSize?: string;
    keywords: string[];
    fileUrl: string; // Path to file on server
    ethicsFileUrl: string;
    mediaFileUrl?: string;
    status: 'pending' | 'approved' | 'rejected' | 'revision';
    ethicsApproved: boolean;
    rejectionReason?: string;
    reviewedBy?: string;
    reviewedDate?: string;
    createdAt: string;
    updatedAt?: string;
}
