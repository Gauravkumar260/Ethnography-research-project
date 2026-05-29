import express from "express";
const router = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { researchSchema } from "../lib/validations";
import { dataUpload, validateUpload } from "../middlewares/uploadMiddleware";
import { submitResearch, getAllSubmissions, getPublicResearch, updateStatus, getResearchStats } from "../controllers/researchController";

const allowedDocTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const allowedMediaTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff", "video/mp4", "video/avi", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
const allAllowed = [...allowedDocTypes, ...allowedMediaTypes];

router.get("/", getPublicResearch);
router.get("/stats", getResearchStats);
router.get("/public", getPublicResearch);

router.post("/submit",
  protect,
  authorize("STUDENT", "ADMIN"),
  dataUpload.fields([
    { name: "mainFile", maxCount: 1 },
    { name: "mediaFile", maxCount: 1 },
    { name: "ethicsFile", maxCount: 1 }
  ]),
  validateUpload(allAllowed),
  validate(researchSchema),
  submitResearch
);

router.get("/admin", protect, authorize("ADMIN"), getAllSubmissions);
router.patch("/:id/status", protect, authorize("ADMIN"), updateStatus);

export default router;
