import { Request, Response } from 'express';
import { logger } from '../lib/logger';
import fieldDataService from '../services/fieldDataService';

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
    if (!(req as any).file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
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