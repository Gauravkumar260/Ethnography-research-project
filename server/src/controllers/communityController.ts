import { logger } from "../lib/logger";
import communityService from "../services/communityService";
import asyncHandler from "express-async-handler";

const getCommunities = asyncHandler(async (req, res) => {
  const communities = await communityService.getActiveCommunities();
  res.status(200).json({ success: true, count: communities.length, data: communities });
});

const getCommunityBySlug = asyncHandler(async (req, res) => {
  const community = await communityService.getCommunityBySlug(req.params.slug);
  if (!community) return res.status(404).json({ message: "Community not found" });
  res.status(200).json({ success: true, data: community });
});

const getCommunityStats = asyncHandler(async (req, res) => {
  const community = await communityService.getCommunityBySlug(req.params.slug);
  if (!community) return res.status(404).json({ message: "Community not found" });
  res.status(200).json({ success: true, data: { researchCount: community.researchCount || 0, population: community.population || 0 } });
});

const createCommunity = asyncHandler(async (req, res) => {
  try {
    const newCommunity = await communityService.createCommunity(req.body);
    res.status(201).json({ success: true, data: newCommunity });
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: "Community name/slug must be unique" });
    throw error;
  }
});

const updateCommunity = asyncHandler(async (req, res) => {
  const community = await communityService.updateCommunity(req.params.id, req.body);
  if (!community) return res.status(404).json({ message: "Community not found" });
  res.status(200).json({ success: true, data: community });
});

const deleteCommunity = asyncHandler(async (req, res) => {
  const success = await communityService.deleteCommunity(req.params.id);
  if (!success) return res.status(404).json({ message: "Community not found" });
  res.status(200).json({ success: true, message: "Community deleted successfully" });
});

export { getCommunities, getCommunityBySlug, getCommunityStats, createCommunity, updateCommunity, deleteCommunity };
