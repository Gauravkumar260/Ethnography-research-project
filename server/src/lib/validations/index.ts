import { z } from 'zod';

export const communitySchema = z.object({
  name: z.string().min(1),
  region: z.string().min(1),
  state: z.string().min(1),
  heroImage: z.string().min(1),
  location: z.string().optional(),
  mapCoordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }).optional(),
  population: z.string().optional(),
  language: z.string().optional(),
  primaryLivelihood: z.string().optional(),
  subtitle: z.string().optional(),
  thumbnail: z.string().optional(),
  posterImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  documentaryVideoUrl: z.string().optional(),
  intro: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional()
});

export const storySchema = z.object({
  communityId: z.string().min(1),
  title: z.string().min(1),
  storyType: z.enum(['oral_history', 'migration', 'craft', 'ritual', 'folklore']),
  content: z.string().min(1),
  narrator: z.string().optional(),
  recordedBy: z.string().optional(),
  recordedDate: z.string().or(z.date()).optional(),
  audioUrl: z.string().optional(),
  transcriptUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']).optional()
});

export const documentarySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().min(1),
  category: z.union([z.string(), z.array(z.string())]),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  studentName: z.string().min(1),
  status: z.enum(['pending', 'approved', 'rejected']).optional()
});

export const fieldDataSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['interview', 'photo', 'survey', 'field_note', 'document', 'dataset']),
  community: z.string().min(1),
  description: z.string().min(1),
  researcher: z.string().min(1),
  batch: z.string().optional(),
  datasetSize: z.string().optional(),
  fileCount: z.number().optional(),
  fileUrl: z.string().optional(),
  accessLevel: z.enum(['public', 'restricted']).optional()
});

export const researchSchema = z.object({
  studentName: z.string().min(1),
  studentId: z.string().min(1),
  email: z.string().email(),
  program: z.string().min(1),
  batch: z.string().optional(),
  mentor: z.string().min(1),
  title: z.string().min(1),
  abstract: z.string().min(1),
  community: z.string().min(1),
  type: z.enum([
    'thesis', 'publication', 'patent', 'dataset', 
    'interview', 'photo', 'survey', 'field_note', 'document'
  ]),
  datasetSize: z.string().optional(),
  keywords: z.union([z.string(), z.array(z.string())]).optional(),
  fileUrl: z.string().optional(),
  ethicsFileUrl: z.string().optional(),
  mediaFileUrl: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'revision']).optional()
});