import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import storyService from "../services/storyService";

const getStories = asyncHandler(async (req: Request, res: Response) => {
  const { community } = req.query;
  const query: Record<string, any> = { status: "published" };
  if (community) query.communityId = String(community);
  const stories = await storyService.findAll(query);
  res.status(200).json({ success: true, count: stories.length, data: stories });
});

const getStoryById = asyncHandler(async (req: Request, res: Response) => {
  const story = await storyService.findById(req.params.id as string);
  if (story) {
    res.status(200).json({ success: true, data: story });
  } else {
    res.status(404).json({ success: false, message: "Story not found" });
  }
});

const createStory = asyncHandler(async (req: Request, res: Response) => {
  const { communityId, title, storyType, content, narrator, recordedBy, recordedDate, audioUrl, transcriptUrl, tags } = req.body;
  const createdStory = await storyService.create({
    communityId, title, storyType, content, narrator, recordedBy, recordedDate, audioUrl, transcriptUrl, tags
  });
  res.status(201).json({ success: true, data: createdStory });
});

export { getStories, getStoryById, createStory };
