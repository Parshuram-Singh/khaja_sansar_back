// middlewares/multer.js
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  isImage ? cb(null, true) : cb('Only images are allowed', false);
};

export const uploadMenuImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});
