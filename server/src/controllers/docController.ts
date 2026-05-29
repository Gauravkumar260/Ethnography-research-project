import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import docService from "../services/docService";

const uploadDocumentary = asyncHandler(async (req: Request, res: Response) => {
  const files = (req as any).files;
  const { title, description, duration, category, studentName } = req.body;
  if (!files || !files.thumbnail || !files.video) return res.status(400).json({ success: false, message: "Please upload both a thumbnail and a video file." });
  let categories: string[] = [];
  if (typeof category === "string") categories = category.split(",").map((c: string) => c.trim());
  else if (Array.isArray(category)) categories = category;
  const savedDoc = await docService.create({
    title, description, duration, category: categories, studentName,
    thumbnailUrl: files.thumbnail[0].path, videoUrl: files.video[0].path, status: "pending"
  });
  res.status(201).json({ success: true, data: savedDoc });
});

const getDocumentaries = asyncHandler(async (req: Request, res: Response) => {
  const docs = await docService.findApproved();
  res.status(200).json({ success: true, count: docs.length, data: docs });
});

const approveDocumentary = asyncHandler(async (req: Request, res: Response) => {
  const doc = await docService.approve(req.params.id as string);
  if (!doc) return res.status(404).json({ success: false, message: "Documentary not found" });
  res.status(200).json({ success: true, data: doc });
});

const deleteDocumentary = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await docService.delete(req.params.id as string);
  if (!deleted) return res.status(404).json({ success: false, message: "Documentary not found" });
  res.status(200).json({ success: true, message: "Documentary removed" });
});

const getAllDocumentariesAdmin = asyncHandler(async (req: Request, res: Response) => {
  const docs = await docService.findAll();
  res.status(200).json({ success: true, count: docs.length, data: docs });
});

export { uploadDocumentary, getDocumentaries, approveDocumentary, deleteDocumentary, getAllDocumentariesAdmin };
