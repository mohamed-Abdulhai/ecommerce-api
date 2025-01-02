import fs from 'fs';
import { addHandler, getAllHandler, getBySlugHandler, logAction } from "../../handler/handler.js";
import { AppError, catchError } from "../../utilities/error/error.js";
import { Brand } from '../../DataBase/models/brand.model.js';

export const addBrand = addHandler(Brand,"brand.created")

export const getAllBrands = getAllHandler(Brand,['title'])

export const getBrand = getBySlugHandler(Brand,"brand.notFound")

export const deleteBySlugBrand = catchError(async (req,res,next)=>{
    const {slug} = req.params
    const brand = await Brand.findOne({slug})
    if(!brand) return next(new AppError("brand.notFound", 404))
    if(brand.logo){
        fs.unlinkSync(brand.logo)
    }
    logAction(req.user.id,'deleted',Brand,brand._id)
    await brand.deleteOne()
    res.json({
        statusMessage:'success',
        message: req.t("brand.deleted")
    })
})
