import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { AppError, catchError } from "../../utilities/error/error.js";
import {User} from "../../DataBase/models/user.model.js"
// Check if email already exists
export const checkExistEmail = catchError(async (req, res, next) => {
    if(req.body.email){
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
        return next(new AppError("auth.emailExists", 409 )); 
    }
    return next();
    }
    return next()
});

// Check if phone number already exists
export const checkExistPhone = catchError(async (req, res, next) => {
    if(req.body.phone){
    const phone = req.body.phone;
    const user = await User.findOne({ phone });
    if (user) {
        return next(new AppError("auth.phoneExists", 409)); 
    }
    return next()
    }
    return next()
});

// Authentication middleware
export const authentication = catchError(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return next(new AppError("auth.unauthenticated", 401)); 
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async (error, decoded) => {
        if (error) {
            return next(new AppError("auth.invalidToken", 403)); 
        }
        const { id } = decoded;
        const user = await User.findById(id);
        if (!user) {
            return next(new AppError("auth.userNotFound", 404)); 
        }
        req.user = decoded;
        return next()
    });
});

// Authorization middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("auth.unauthorize", 403)); 
        }
        return next()
    };
};

// Ensure email or phone is provided
export const checkEmailOrPhone = catchError(async (req, res, next) => {
    const { email, phone } = req.body;
    if (!email && !phone) {
        return next(new AppError("auth.emailOrPhone", 422)); 
    }
    return next()
});

// Generate access token
export const generateAccessToken = (id, role) => {
    const accessToken = jwt.sign(
        { id, role },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { subject: 'accessToken', expiresIn: '15m' }
    );
    return accessToken;
};

// Generate refresh token
export const generateRefreshToken = (id, role) => {
    const refreshToken = jwt.sign(
        { id, role },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { subject: 'refreshToken', expiresIn: '7d' }
    );
    return refreshToken;
};

// Hash password
export const hashPassword = catchError(async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT));
    req.body.password = hashedPassword;
    return next()
});