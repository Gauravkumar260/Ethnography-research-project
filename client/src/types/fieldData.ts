export interface FieldData {
    _id: string;
    title: string;
    type: 'interview' | 'photo' | 'survey' | 'field_note' | 'document' | 'dataset';
    community: string;
    description: string;
    researcher: string;
    batch?: string;
    datasetSize?: string;
    fileCount?: number;
    fileUrl: string;
    accessLevel: 'public' | 'restricted';
    downloadCount: number;
    createdAt: string;
    updatedAt?: string;
}
