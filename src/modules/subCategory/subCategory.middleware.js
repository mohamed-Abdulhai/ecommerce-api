import { Category } from "../../DataBase/models/category.model";
import { SubCategory } from "../../DataBase/models/subCategory.model";
import { AppError, catchError } from "../../utilities/error/error.js";

export const addCategoryToBody = catchError(async (req,res,next)=>{
    const {Category} = req.params
    const findCategory = await Category.findOne({slug:Category})
    if(!findCategory) return next(new AppError("category.notFound", 404))
    req.body.category = Category
    return next()
})

export const isTheCategoryInSubcategory = catchError(async (req,res,next)=>{
    const {category,slug} = req.params
    const findSubCategory = await SubCategory.findOne({slug})
    if(!findSubcategory) return next(new AppError("subcategory.notFound", 404))
    if(findSubCategory.category ===category) return next()
    return next(new AppError("category.notInSubcategory", 400))
    
})