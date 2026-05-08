import { Request, Response } from 'express';
import { logger } from '../lib/logger';
import fieldDataService from '../services/fieldDataService';
import { validateFileContent } from '../middlewares/uploadMiddleware';
import fs from 'fs';

// @desc    Get all field data (with optional filtering)
// @route   GET /api/field-data
const getFieldData = async (req: Request, res: Response) => {
  try {
    const { type, community } = req.query;
    const query: Record<string, any> = {};

    if (type && type !== 'all') {
      query.type = String(type);
    }
    if (community) {
      query.community = String(community);
    }

    const data = await fieldDataService.findAll(query);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Upload new field data (Protected)
// @route   POST /api/field-data/upload
const uploadFieldData = async (req: Request, res: Response) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // Security: Validate file content using magic bytes
    const allowedTypes = [
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv', 'image/jpeg', 'image/jpg', 'image/png', 'image/tiff',
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav',
      'video/mp4', 'video/avi', 'video/quicktime',
      'application/zip', 'application/x-rar-compressed'
    ];

    const isValid = await validateFileContent(file, allowedTypes);
    if (!isValid) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      return res.status(400).json({ success: false, message: 'Invalid file content detected.' });
    }

    const { title, type, community, description, researcher, batch, datasetSize, fileCount } = req.body;

    const savedData = await fieldDataService.create({
      title,
      type,
      community,
      description,
      researcher,
      batch,
      datasetSize,
      fileCount,
      fileUrl: (req as any).file.path,
    });

    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export { getFieldData, uploadFieldData };