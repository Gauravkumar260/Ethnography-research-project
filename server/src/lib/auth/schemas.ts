import { z } from 'zod';

// ==========================================
// STORY SCHEMAS
// ==========================================
export const createStorySchema = z.object({
    communityId: z.string().min(1, 'Community ID is required'),
    title: z.string().min(1, 'Title is required'),
    storyType: z.enum(['oral_history', 'migration', 'craft', 'ritual', 'folklore'], {
        message: 'Invalid story type'
    }),
    content: z.string().min(1, 'Content is required'),
    narrator: z.string().optional(),
    recordedBy: z.string().optional(),
    recordedDate: z.string().optional(),
    audioUrl: z.string().optional(),
    transcriptUrl: z.string().optional(),
    tags: z.array(z.string()).optional()
});

// ==========================================
// COMMUNITY SCHEMAS
// ==========================================
export const createCommunitySchema = z.object({
    name: z.string().min(1, 'Community name is required'),
    region: z.string().min(1, 'Region is required'),
    state: z.string().min(1, 'State is required'),
    location: z.string().optional(),
    mapCoordinates: z.object({
        latitude: z.number(),
        longitude: z.number()
    }).optional(),
    population: z.string().optional(),
    language: z.string().optional(),
    primaryLivelihood: z.string().optional(),
    heroImage: z.string().min(1, 'Hero image is required'),
    thumbnail: z.string().optional(),
    posterImage: z.string().optional(),
    intro: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional()
});

export const updateCommunitySchema = createCommunitySchema.partial();

// ==========================================
// DOCUMENTARY SCHEMAS
// ==========================================
export const updateDocStatusSchema = z.object({
    status: z.enum(['pending', 'approved', 'rejected'], {
        message: 'Status must be pending, approved, or rejected'
    })
});

// ==========================================
// RESEARCH SCHEMAS
// ==========================================
export const updateResearchStatusSchema = z.object({
    status: z.enum(['pending', 'approved', 'rejected', 'revision'], {
        message: 'Invalid status'
    }),
    comments: z.string().optional()
});
