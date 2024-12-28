import fs from 'fs';
import { AppError, catchError } from "../utilities/error/error.js";

export const validateImageFile = (required = true) => 
    catchError(async (req, res, next) => {
      if (!req.file) {
        if (required) {
          return next(new AppError("image.imageRequired", 400));
        }
        return next();
      }
  
      if (!req.file.mimetype.startsWith("image/")) {
        fs.unlinkSync(req.file.path); 
        return next(new AppError("image.imageType", 400));
      }
  
      return next();
    });