import fs from 'fs';
import { AppError } from '../utilities/error/error.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });

    if (error) {
      const { details } = error;

      const messages = details.map((i) => {
        const fieldName = i.path.join('.');
        const message = i.message.replace(/["/]/g, ''); 
        return `${fieldName}: ${req.t(message)}`;
      });
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      if (req.files) {
        req.files.forEach(file => fs.unlinkSync(file.path));
      }

      next(new AppError(messages.join(', '), 403, 'failed'));
    } else {
      next();
    }
  };
};
