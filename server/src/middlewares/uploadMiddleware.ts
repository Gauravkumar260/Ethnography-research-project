import multer from 'multer';
import path from 'path';
import fs from 'fs';
import FileType from 'file-type';

const mimeToExt: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'text/csv': '.csv',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/tiff': '.tiff',
  'image/webp': '.webp',
  'audio/mpeg': '.mp3',
  'audio/mp3': '.mp3',
  'audio/wav': '.wav',
  'audio/x-wav': '.wav',
  'video/mp4': '.mp4',
  'video/avi': '.avi',
  'video/quicktime': '.mov',
  'video/x-msvideo': '.avi',
  'video/x-matroska': '.mkv',
  'application/zip': '.zip',
  'application/x-rar-compressed': '.rar'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'storage/uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = mimeToExt[file.mimetype] || '.bin';
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

/**
 * Validates file content using magic bytes.
 * This is more secure than relying on the file extension or the Content-Type header.
 */
export const validateFileContent = async (file: Express.Multer.File, allowedMimeTypes: string[]) => {
  if (!file.path) return false;

  const type = await FileType.fromFile(file.path);

  // For text/plain and CSV, file-type might return undefined as they don't have distinct magic bytes
  if (!type) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ((ext === '.txt' || ext === '.csv') && allowedMimeTypes.includes(file.mimetype)) {
       return true;
    }
    return false;
  }

  return allowedMimeTypes.includes(type.mime);
};

// File filter for documents (PDF, DOC, DOCX)
const documentFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

// File filter for media (images and videos)
const mediaFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tiff',
    'image/webp',
    // Videos
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPG, PNG, TIFF) and videos (MP4, AVI, MOV) are allowed.'), false);
  }
};

// File filter for field data (all types including audio)
const dataFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = [
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    // Spreadsheets
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tiff',
    // Audio
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav',
    // Video
    'video/mp4',
    'video/avi',
    'video/quicktime',
    // Archives
    'application/zip',
    'application/x-rar-compressed'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type for dataset.'), false);
  }
};

// Upload for research documents (50MB limit)
const documentUpload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: documentFilter,
});

// Upload for media (thumbnails + videos - 5GB limit)
const mediaUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB
  },
  fileFilter: mediaFilter,
});

// Upload for field data (1GB limit for large datasets)
const dataUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
  },
  fileFilter: dataFilter,
});

export { 
  documentUpload,
  mediaUpload,
  dataUpload,
  // Default export for backward compatibility
  documentUpload as upload
 };
