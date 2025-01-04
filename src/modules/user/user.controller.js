import { User } from "../../DataBase/models/user.model.js";
import { logAction } from "../../handler/handler.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const updateUser = catchError(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if(!user){
        return next(new AppError('User.notFound'),404)
    }
    logAction(req.user.id,'updated',User,user._id)
    res.status(200).json({
        statusMessage:'success',
        message:req.t('auth.UserUpdated'),
        data:{
            _id:user._id,
            userName:user.userName,
            email:user.email,
            phone:user.phone,
            role:user.role,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt,
        }
    })
})

export const deleteUser = catchError(async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return next(new AppError('auth.userNotFound',404))
    logAction(req.user.id,'deleted',User,user._id)
    res.status(200).json({
        statusMessage:'success',
        message:req.t('auth.UserDeleted'),
        data:null
    })
})

export const getUser = catchError(async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new AppError('auth.userNotFound'),404)
    }
    res.status(200).json({
        statusMessage:'success',
        user:{
            _id:user._id,
            userName:user.userName,
            email:user.email,
            phone:user.phone,
            role:user.role,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt,
        }
    })
})

export const getProfile = catchError(async (req,res,next)=>{
  const user = await User.findById(req.user.id);
  if(!user){
    return next(new AppError('auth.userNotFound'),404)
}
res.status(200).json({
    statusMessage:'success',
    data:{
        _id:user._id,
        userName:user.userName,
        email:user.email,
        phone:user.phone,
        role:user.role,
        updatedAt:user.updatedAt,
        createdAt:user.createdAt,
    }
})
})

export const getAllUsers = catchError(async (req, res, next) => {
    const { search, page = 1, limit = 10 } = req.query;

    const searchQuery = {
        ...(
            search
                ? { $or: searchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })) }
                : {}
        ),
        role: Role.USER,
    };

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        customLabels: {
            totalDocs: `totalUsers`,
            docs: `users`, 
        },
        sort: { createdAt: -1 },
    };

    const users = await User.paginate(searchQuery, options);
    



    res.status(200).json({
        statusMessage: 'success',
        data:users
    });
});




export const getAllStaff = catchError(async (req, res, next) => {
    const { search, page = 1, limit = 10 } = req.query;

    const searchQuery = {
        ...(
            search
                ? { $or: searchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })) }
                : {}
        ),
        role: Role.ADMIN||Role.STAFF,
    };

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        customLabels: {
            totalDocs: `totalUsers`,
            docs: `users`, 
        },
        sort: { createdAt: -1 },
    };

    const users = await User.paginate(searchQuery, options);
    



    res.status(200).json({
        statusMessage:'success',
        data:users
    })
});


export const changeRoleByAdmin = catchError(async (req, res,next) => {
   const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); 
    if(!user){
        return next(new AppError('auth.userNotFound'),404)
    }
    logAction(req.user.id,'updated',User,user._id)
    res.status(200).json({
        statusMessage:'success',
        message:req.t('auth.UserUpdated'),
        data:{
            _id:user._id,
            userName:user.userName,
            email:user.email,
            phone:user.phone,
            role:user.role,
            updatedAt:user.updatedAt,
            createdAt:user.createdAt,
        }
    })
})