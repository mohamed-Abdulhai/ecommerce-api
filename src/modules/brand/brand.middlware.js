import fs from "fs"
import slugify  from 'slugify'
import { Brand } from "../../DataBase/models/brand.model.js"
import { AppError, catchError } from "../../utilities/error/error.js"

export const slugTheBrand = catchError(async (req,res,next) =>{
    if(req.body.title){
        req.body.slug = slugify(req.body.title,{
            lower:true,
            trim:true
        })
        return next()
    }
    return next()
})

export const addBrandLogo = catchError(async(req,res,next) =>{
    if(req.file){
        req.body.logo = req.file.path
    }
    
    return next()
})

export const exitBrand = catchError(async (req,res,next)=>{
    if(req.body.title){
        const brand = await Brand.findOne({ title: req.body.title });
    if(brand){
        fs.unlinkSync(req.file.path)
        return next(new AppError('brand.alreadyExists'),409)
    }
    return next()
    }
    next()
})