import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import xssClean from 'xss-clean';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import slowDown from 'express-slow-down';
import rateLimit from 'express-rate-limit';
import { dataBaseConnection } from './src/DataBase/db.config.js';
import v1Router from './src/routers/v1Router.js';
import { AppError } from './src/utilities/error/error.js';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsFile = './uploads';

if (!fs.existsSync(uploadsFile)) {
    fs.mkdirSync(uploadsFile);
}


// Initialize app and environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Middleware configurations
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));
app.use(cookieParser());
app.use(xssClean());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(mongoSanitize());

// Rate limiting and slowing down configuration
const burstLimiter = slowDown({
    windowMs: 1000, // 1 second
    delayAfter: 5, // Allow 5 requests immediately
    delayMs: (used, req) => (used - req.slowDown.limit) * 500, // Delay after limit
});
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100, 
    handler: (req, res, next) => {
        next(new AppError(req.t('server.tooManyReq'), 429));
    },
});
const combinedLimiter = [burstLimiter, limiter];
app.use(combinedLimiter);

// i18next configuration
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        // debug: process.env.NODE_ENV === 'development',
        backend: {
            loadPath: path.resolve('./locales/{{lng}}/translation.json'),
        },
    });
app.use(middleware.handle(i18next));

// Database connection
dataBaseConnection()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

// Application routes
app.use('/api/v1/', v1Router);

// 404 Error for undefined routes
app.use('*', (req, res, next) => {
    next(new AppError('server.notFoundRoute', 404));
});

// Global error handler
app.use((err, req, res, next) => {
    let error = { ...err };
    error.message = err.message || '';
    error.statusCode = err.statusCode || 500;
    const translate = req.t || ((msg) => msg); 
    res.status(error.statusCode).json({
        statusMessage: 'failed',
        message: translate(error.message),
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, 
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});