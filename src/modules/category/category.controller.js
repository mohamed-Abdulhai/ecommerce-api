import fs from 'fs';
import { Category } from "../../DataBase/models/category.model.js";
import { addHandler, getAllHandler, getBySlugHandler, logAction } from "../../handler/handler.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const addCategory = addHandler(Category,"category.created")

export const getAllCategories = getAllHandler(Category,['title.ar','title.en'])

export const getCategory = getBySlugHandler(Category,"category.notFound")

export const deleteBySlugCategory = catchError(async (req,res,next)=>{
    const {slug} = req.params
    const category = await Category.findOne({slug})
    if(!category) return next(new AppError("category.notFound", 404))
    if(category.image){
        fs.unlinkSync(category.image)
    }
    logAction(req.user.id,'deleted',Category,category._id)
    await category.deleteOne()
    res.json({
        statusMessage:'success',
        message: req.t("category.deleted")
    })
})

