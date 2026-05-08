import { Request, Response } from 'express';
import { logger } from '../lib/logger';
import docService from '../services/docService';
import { validateFileContent } from '../middlewares/uploadMiddleware';
import fs from 'fs';

// @desc    Upload a new Documentary
// @route   POST /api/docs/upload
const uploadDocumentary = async (req: Request, res: Response) => {
  try {
    const files = (req as any).files;
    const { title, description, duration, category, studentName } = req.body;

    if (!files || !files.thumbnail || !files.video) {
      return res.status(400).json({ success: false, message: 'Please upload both a thumbnail and a video file.' });
    }

    // Security: Validate file content using magic bytes
    const thumbnailFile = files.thumbnail[0];
    const videoFile = files.video[0];

    const allowedImgTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];

    const isImgValid = await validateFileContent(thumbnailFile, allowedImgTypes);
    const isVidValid = await validateFileContent(videoFile, allowedVideoTypes);

    if (!isImgValid || !isVidValid) {
      [thumbnailFile, videoFile].forEach(f => {
        if (f && f.path && fs.existsSync(f.path)) fs.unlinkSync(f.path);
      });
      return res.status(400).json({ success: false, message: 'Invalid file content detected.' });
    }

    let categories: string[] = [];
    if (typeof category === 'string') {
      categories = category.split(',').map((c: string) => c.trim());
    } else if (Array.isArray(category)) {
      categories = category;
    }

    const savedDoc = await docService.create({
      title,
      description,
      duration,
      category: categories,
      studentName,
      thumbnailUrl: files.thumbnail[0].path,
      videoUrl: files.video[0].path,
      status: 'pending'
    });

    res.status(201).json({ success: true, data: savedDoc });
  } catch (error) {
    logger.error("Upload Error:", error);
    res.status(500).json({ success: false, message: 'Server Error during upload' });
  }
};

// @desc    Get All Approved Documentaries (Public)
// @route   GET /api/docs
const getDocumentaries = async (req: Request, res: Response) => {
  try {
    const docs = await docService.findApproved();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    logger.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Approve a Documentary (Admin)
// @route   PATCH /api/docs/approve/:id
const approveDocumentary = async (req: Request, res: Response) => {
  try {
    const doc = await docService.approve(req.params.id as string);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Documentary not found' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    logger.error("Approval Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a Documentary (Admin)
// @route   DELETE /api/docs/:id
const deleteDocumentary = async (req: Request, res: Response) => {
  try {
    const deleted = await docService.delete(req.params.id as string);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Documentary not found' });
    }
    res.status(200).json({ success: true, message: 'Documentary removed' });
  } catch (error) {
    logger.error("Delete Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get All Documentaries (Admin - Pending & Approved)
// @route   GET /api/docs/admin/all
const getAllDocumentariesAdmin = async (req: Request, res: Response) => {
  try {
    const docs = await docService.findAll();
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    logger.error("Admin Fetch Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export {
  uploadDocumentary,
  getDocumentaries,
  approveDocumentary,
  deleteDocumentary,
  getAllDocumentariesAdmin
};
