import express from "express";
const router = express.Router();
import { uploadDocumentary, getDocumentaries, approveDocumentary, deleteDocumentary, getAllDocumentariesAdmin } from "../controllers/docController";
import { mediaUpload, validateUpload } from "../middlewares/uploadMiddleware";
import { protect, authorize } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { documentarySchema } from "../lib/validations";

const allowedImgTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
const allowedVideoTypes = ["video/mp4", "video/avi", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
const allAllowed = [...allowedImgTypes, ...allowedVideoTypes];

router.get("/", getDocumentaries);

router.post(
  "/upload",
  protect,
  authorize("ADMIN"),
  mediaUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateUpload(allAllowed),
  validate(documentarySchema),
  uploadDocumentary
);

router.get("/admin/all", protect, authorize("ADMIN"), getAllDocumentariesAdmin);
router.patch("/approve/:id", protect, authorize("ADMIN"), approveDocumentary);
router.delete("/:id", protect, authorize("ADMIN"), deleteDocumentary);

export default router;
