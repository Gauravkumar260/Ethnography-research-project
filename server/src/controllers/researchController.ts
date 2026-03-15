import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import researchService from '../services/researchService';

// ==========================================
// 1. SUBMIT RESEARCH (Student)
// ==========================================
const submitResearch = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const files = (req as any).files || {};

  const mainFile = files['mainFile'] ? files['mainFile'][0] : null;
  const mediaFile = files['mediaFile'] ? files['mediaFile'][0] : null;
  const ethicsFile = files['ethicsFile'] ? files['ethicsFile'][0] : null;

  if (!mainFile) {
    return res.status(400).json({ success: false, message: 'Main research document is required.' });
  }
  if (!ethicsFile) {
    return res.status(400).json({ success: false, message: 'Ethics approval document is required.' });
  }

  const requiredFields = ['studentName', 'studentId', 'email', 'program', 'mentor', 'title', 'abstract', 'community', 'type'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ success: false, message: `Field '${field}' is required.` });
    }
  }

  let keywordsArray: string[] = [];
  if (req.body.keywords && typeof req.body.keywords === 'string') {
    keywordsArray = req.body.keywords.split(',').map((key: string) => key.trim());
  } else if (Array.isArray(req.body.keywords)) {
    keywordsArray = req.body.keywords;
  }

  const savedResearch = await researchService.create({
    studentName: req.body.studentName,
    studentId: req.body.studentId,
    email: req.body.email,
    program: req.body.program,
    batch: req.body.batch,
    mentor: req.body.mentor,
    title: req.body.title,
    abstract: req.body.abstract,
    community: req.body.community,
    type: req.body.type,
    keywords: keywordsArray,
    fileUrl: mainFile.path.replace(/\\/g, '/'),
    ethicsFileUrl: ethicsFile.path.replace(/\\/g, '/'),
    mediaFileUrl: mediaFile ? mediaFile.path.replace(/\\/g, '/') : undefined,
    status: 'pending'
  });

  res.status(201).json({
    success: true,
    message: 'Research submitted successfully!',
    data: savedResearch
  });
});

// ==========================================
// 2. GET ALL SUBMISSIONS (Admin)
// ==========================================
const getAllSubmissions = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const submissions = await researchService.findAll();
  res.status(200).json({ success: true, count: submissions.length, data: submissions });
});

// ==========================================
// 3. GET PUBLIC RESEARCH (Everyone)
// ==========================================
const getPublicResearch = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const research = await researchService.findApproved();
  res.status(200).json({ success: true, count: research.length, data: research });
});

// ==========================================
// 4. UPDATE STATUS (Admin)
// ==========================================
const updateStatus = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { status, comments } = req.body;

  const updatedResearch = await researchService.updateStatus(req.params.id as string, {
    status,
    rejectionReason: comments || '',
    reviewedDate: new Date()
  });

  if (!updatedResearch) {
    return res.status(404).json({ success: false, message: 'Research not found' });
  }

  res.status(200).json({
    success: true,
    message: `Research marked as ${status}`,
    data: updatedResearch
  });
});

// ==========================================
// 5. GET RESEARCH STATS (Landing Page)
// ==========================================
const getResearchStats = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const typeStats = await researchService.getStatsByType();

  const countsByType: Record<string, number> = {};
  typeStats.forEach(item => {
    if (item._id) countsByType[item._id.toLowerCase()] = item.count;
  });

  const totalCount = await researchService.countAll();
  const approvedCount = await researchService.countApproved();

  const stats = {
    byType: countsByType,
    settlement: [
      { label: 'Permanent', value: 45, icon: '🏠' },
      { label: 'Nomadic', value: 25, icon: '🚶' }
    ],
    migration: { seasonal: 65, permanent: 15 },
    totalEntries: totalCount,
    publishedPapers: approvedCount
  };

  res.status(200).json({ success: true, data: stats });
});

export {
  submitResearch,
  getAllSubmissions,
  getPublicResearch,
  updateStatus,
  getResearchStats
};