import multer, { FileFilterCallback } from "multer";
import { Request, NextFunction } from "express";
import sharp from "sharp";

// Set up multer storage to use memory storage
const multerStorage = multer.memoryStorage();

// Define file filter to allow only image files
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
};

// Configure multer upload for multiple images
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware for handling multiple image uploads
export const uploadCompPhotos = upload.array("photo", 5); // You can change the limit (5) to allow more/less images

// Middleware for resizing multiple images
export const resizeCompPhotos = async (
  req: Request,
  res: Express.Response,
  next: NextFunction
) => {
  if (!req.files) return next();

  req.body.photo = [];

  // Process each uploaded image file
  await Promise.all(
    (req.files as Express.Multer.File[]).map(async (file, i) => {
      const filename = `comp-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`src/public/img/compImgs/${filename}`);

      req.body.photo.push(filename);
    })
  );

  next();
};
