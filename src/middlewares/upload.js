import mongoose from 'mongoose';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + new mongoose.Types.ObjectId() + '-' + file.originalname);
        
    }
});


export const upload = multer({
    storage,
    limits: {
        fileSize: 30 * 1024 * 1024 // 20 MB file size limit
    } 
});

