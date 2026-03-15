import { Request, Response } from 'express';
import storyService from '../services/storyService';

// @desc    Get stories by Community ID
// @route   GET /api/stories?community=gadia-lohar
const getStories = async (req: Request, res: Response) => {
  try {
    const { community } = req.query;
    const query: Record<string, any> = { status: 'published' };

    if (community) {
      query.communityId = String(community);
    }

    const stories = await storyService.findAll(query);
    res.status(200).json({ success: true, count: stories.length, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single story details
// @route   GET /api/stories/:id
const getStoryById = async (req: Request, res: Response) => {
  try {
    const story = await storyService.findById(req.params.id as string);
    if (story) {
      res.status(200).json({ success: true, data: story });
    } else {
      res.status(404).json({ success: false, message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a new story (Protected)
// @route   POST /api/stories
const createStory = async (req: Request, res: Response) => {
  try {
    const { communityId, title, storyType, content, narrator, recordedBy, recordedDate, audioUrl, transcriptUrl, tags } = req.body;

    const createdStory = await storyService.create({
      communityId,
      title,
      storyType,
      content,
      narrator,
      recordedBy,
      recordedDate,
      audioUrl,
      transcriptUrl,
      tags
    });
    res.status(201).json({ success: true, data: createdStory });
  } catch (error: any) {
    res.status(400).json({ success: false, message: 'Invalid story data', error: error.message });
  }
};

export { getStories, getStoryById, createStory };