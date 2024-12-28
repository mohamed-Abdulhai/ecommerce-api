import fs from 'fs';
import slugify from 'slugify';
import { Category } from "../../DataBase/models/category.model.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const exitCategory = catchError(async (req,res,next)=>{
    if(req.body.title){
        const category = await Category.findOne({ "title.en": req.body.title.en });
    if(category){
        fs.unlinkSync(req.file.path)
        return next(new AppError('Category.alreadyExists'),409)
    }
    return next()
    }
    next()
})

export const slugTheCategory = catchError(async (req,res,next) =>{
    req.body.slug = slugify(req.body.title.en,{
        lower:true,
        trim:true
    })
    return next()
})

export const addCategoryImage = catchError(async(req,res,next) =>{
    if(req.file){
        req.body.image = req.file.filename
    }
    
    return next()
})

