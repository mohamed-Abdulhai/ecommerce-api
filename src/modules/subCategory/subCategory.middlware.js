import { Category } from "../../DataBase/models/category.model.js";
import { catchError } from "../../utilities/error/error.js";

export const isTheCategoryExists = catchError(async (req,res,next)=>{
    if(req.body.category){
        const category = await Category.findById(req.body.category)
    if(!category){
        return next(new Error('Category.notFound'),404)
    }
    return next()
    }
    return next()
})

export const theSubCategoryAlreadyExists = catchError(async (req,res,next)=>{
    if(req.body.title.en){
        const subCategory = await CategoryfindOne({ "title.en": req.body.title.en });
    if(subCategory){
        return next(new Error('Subcategory.alreadyExists'),409)
    }
    return next()
    }
    return next()
})