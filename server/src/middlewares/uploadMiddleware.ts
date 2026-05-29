import multer from "multer";
import path from "path";
import fs from "fs";
import FileType from "file-type";
import { Request, Response, NextFunction } from "express";

const mimeToExt: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "text/plain": ".txt",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "text/csv": ".csv",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/tiff": ".tiff",
  "image/webp": ".webp",
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "video/mp4": ".mp4",
  "video/avi": ".avi",
  "video/quicktime": ".mov",
  "application/zip": ".zip",
  "application/x-rar-compressed": ".rar"
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "storage/uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = mimeToExt[file.mimetype] || ".bin";
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const validateFileContent = async (file: Express.Multer.File, allowedMimeTypes: string[]) => {
  if (!file.path) return false;
  const type = await FileType.fromFile(file.path);
  if (!type) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ((ext === ".txt" || ext === ".csv") && allowedMimeTypes.includes(file.mimetype)) {
       return true;
    }
    return false;
  }
  return allowedMimeTypes.includes(type.mime);
};

/**
 * Root Cause Fix: Validation Middleware Factory
 * Ensures all uploads are validated using magic bytes before reaching the controller.
 */
export const validateUpload = (allowedMimeTypes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const files = (req as any).files || (req.file ? { file: [req.file] } : {});
    const fileList = Object.values(files).flat() as Express.Multer.File[];

    for (const file of fileList) {
      const isValid = await validateFileContent(file, allowedMimeTypes);
      if (!isValid) {
        fileList.forEach(f => {
          if (f.path && fs.existsSync(f.path)) fs.unlinkSync(f.path);
        });
        return res.status(400).json({ success: false, message: `Invalid file content in \${file.fieldname}` });
      }
    }
    next();
  };
};

const documentFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed."), false);
  }
};

const mediaFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/tiff", "image/webp", "video/mp4", "video/avi", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

const dataFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv", "image/jpeg", "image/png", "image/tiff", "audio/mpeg", "audio/wav", "video/mp4", "video/avi",
    "video/quicktime", "application/zip", "application/x-rar-compressed"
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type for dataset."), false);
  }
};

export const documentUpload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: documentFilter });
export const mediaUpload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 * 1024 }, fileFilter: mediaFilter });
export const dataUpload = multer({ storage, limits: { fileSize: 1024 * 1024 * 1024 }, fileFilter: dataFilter });
