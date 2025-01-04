import { Category } from "../../DataBase/models/category.model.js";
import { SubCategory } from "../../DataBase/models/subCategory.model.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const isTheCategoryExists = catchError(async (req,res,next)=>{
    const category = await Category.findById(req.body.category)
    if(!category){
        return next(new AppError('Category.notFound'),404)
    }
    return next()

})

export const theSubCategoryAlreadyExists = catchError(async (req,res,next)=>{
    const subCategory = await SubCategory.findOne({ "title.en": req.body.title.en });
    if(subCategory){
        return next(new AppError('subCategory.alreadyExists'),409)
    }
    return next()

})