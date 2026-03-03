// @ts-nocheck
import Story from '../models/Story';

// @desc    Get stories by Community ID
// @route   GET /api/stories?community=gadia-lohar
const getStories = async (req, res) => {
  try {
    const { community } = req.query;
    let query = { status: 'published' };

    if (community) {
      query.communityId = String(community);
    }

    const stories = await Story.find(query).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single story details
// @route   GET /api/stories/:id
const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new story (Protected)
// @route   POST /api/stories
const createStory = async (req, res) => {
  try {
    const { communityId, title, storyType, content, narrator, recordedBy, recordedDate, audioUrl, transcriptUrl, tags } = req.body;
    
    const story = new Story({
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
    const createdStory = await story.save();
    res.status(201).json(createdStory);
  } catch (error) {
    res.status(400).json({ message: 'Invalid story data', error: error.message });
  }
};

export {  getStories, getStoryById, createStory  };