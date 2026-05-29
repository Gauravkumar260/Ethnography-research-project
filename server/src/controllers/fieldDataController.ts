import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fieldDataService from "../services/fieldDataService";
import path from "path";

const getFieldData = asyncHandler(async (req: Request, res: Response) => {
  const { type, community } = req.query;
  const query: Record<string, any> = {};
  if (type && type !== "all") query.type = String(type);
  if (community) query.community = String(community);
  const data = await fieldDataService.findAll(query, (req as any).user);
  res.status(200).json({ success: true, count: data.length, data });
});

const uploadFieldData = asyncHandler(async (req: Request, res: Response) => {
  const file = (req as any).file;
  if (!file) return res.status(400).json({ success: false, message: "Please upload a file" });
  const { title, type, community, description, researcher, batch, datasetSize, fileCount, accessLevel } = req.body;
  const relativePath = path.relative(process.cwd(), file.path).replace(/\\/g, "/");
  const savedData = await fieldDataService.create({
    title, type, community, description, researcher, batch, datasetSize, fileCount,
    accessLevel: accessLevel || "public", fileUrl: relativePath,
  });
  res.status(201).json({ success: true, data: savedData });
});

export { getFieldData, uploadFieldData };
