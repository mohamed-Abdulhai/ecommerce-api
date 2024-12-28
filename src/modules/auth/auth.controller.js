import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../../DataBase/models/user.model.js";
import { AppError, catchError } from "../../utilities/error/error.js";
import { generateAccessToken, generateRefreshToken } from "./auth.middleware.js";
import { Log } from "../../DataBase/models/Log.model.js";
import { logAction } from "../../handler/handler.js";



const isProduction = process.env.NODE_ENV === 'production';

// register controller

export const register = catchError(async (req, res, next) => {
    const user = await User.create(req.body);

    logAction(user_id,'created',User,user_id);

    res.status(201).json({
        message: req.t("auth.UserCreated"),
        statusMessage: 'success',
    });
});

// login controller

export const login = catchError(async (req, res, next) => {
    const { email, phone, password } = req.body;
    
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return next(new AppError("auth.invalidEmailPhonePassword", 409));

    const isMatch = bcrypt.compareSync(password, user.password); 
    if (!isMatch) return next(new AppError("auth.invalidEmailPhonePassword", 409));

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    res.cookie('accessToken', accessToken, { 
        httpOnly: true, 
        secure: isProduction, 
        sameSite: 'Strict', 
        maxAge: 15 * 60 * 1000  // 15 minutes
    }); 
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    res.status(200).json({
        message: req.t("auth.userLogin"),
        statusMessage: 'success',
        data: {
            userID: user._id,
            userName: user.userName,
            userEmail: user.email,
            userPhone: user.phone,
            userRole: user.role
        }
    });
});


// logout cntroller
export const logout = catchError(async (req, res, next) =>{

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({
        message: req.t("auth.userLogout"),
        statusMessage: 'success',
    });

})

// check auth cntroller

export const checkAuth = catchError(async (req, res, next) =>{
    res.status(200).json({
        message: req.t("auth.userAuthenticated"),
        statusMessage: 'success'
    });
})

//  check auth return role cntroller

export const checkAuthByRole = catchError(async (req, res, next) =>{
    const role = req.user.role;
    return res.status(200).json({
        statusMessage: 'success',
        message: req.t("auth.userAuthenticated"),
        role: role,
    });
})

//  refresh token cntroller

export const refreshToken = catchError(async (req,res,next)=>{
    const { refreshToken } = req.cookies
    if (!refreshToken) return next(new AppError("invalidTokenMsg", 403))
      jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY,async(error,decoded)=>{
        
        if(error) return next(new AppError("invalidTokenMsg", 498))
        const {id,role} = decoded
      const newAccessToken = generateAccessToken(id,role)
      res.cookie('accessToken',newAccessToken,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: 'Strict',
        secure: isProduction 
      });
      res.status(200).json({
        message: req.t("auth.tokenRefReshed"),
        statusMessage: 'success'
    });
    })
    
  })

export const changePassword = catchError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    const isMatch = bcrypt.compareSync(req.body.oldPassword, user.password);
    if (!isMatch) return next(new AppError("auth.notTrueOldPassword", 409))
    user.password = req.body.password
    await user.save();
    logAction(req.user.id,'updated',User,user._id)
    res.status(200).json({
        message: req.t("auth.passwordChanged"),
        statusMessage:'success'
    });
})