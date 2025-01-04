import fs from 'fs';
import { AppError } from '../utilities/error/error.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );

    if (error) {
      const { details } = error;

      const messages = details.map((i) => {
        const fieldName = i.path.join(':');
        const message = i.message.replace(/["/]/g, ''); 
        return `${fieldName}: ${req.t(message)}`;
      });

      // Delete single uploaded file (if present)
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      // Delete multiple uploaded files
      if (req.files) {
        if (Array.isArray(req.files)) {
          req.files.forEach((file) => fs.unlinkSync(file.path));
        } else if (typeof req.files === 'object') {
          Object.values(req.files).flat().forEach((file) => fs.unlinkSync(file.path));
        }
      }

      return next(new AppError(messages.join(', '), 403, 'failed'));
    }

    next();
  };
};
