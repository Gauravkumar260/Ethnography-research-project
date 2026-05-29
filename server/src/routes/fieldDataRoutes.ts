import express from "express";
const router = express.Router();
import { getFieldData, uploadFieldData } from "../controllers/fieldDataController";
import { protect, authorize } from "../middlewares/authMiddleware";
import { dataUpload, validateUpload } from "../middlewares/uploadMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { fieldDataSchema } from "../lib/validations";

const allowedTypes = [
  "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv", "image/jpeg", "image/png", "image/tiff", "audio/mpeg", "audio/wav", "video/mp4", "video/avi",
  "video/quicktime", "application/zip", "application/x-rar-compressed"
];

router.get("/", getFieldData);

router.post("/upload",
  protect,
  authorize("ADMIN"),
  dataUpload.single("file"),
  validateUpload(allowedTypes),
  validate(fieldDataSchema),
  uploadFieldData
);

export default router;
