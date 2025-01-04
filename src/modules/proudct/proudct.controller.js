import fs, { unlinkSync } from 'fs';
import { Product } from "../../DataBase/models/product.model.js";
import { addHandler, getAllHandler, getBySlugHandler, logAction, updateBySlugHandler } from "../../handler/handler.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const addProduct = addHandler(Product,"product.created");

export const getAllProducts = getAllHandler(Product,['title.ar','title.en','description.en','description.ar','price','priceAfterDiscount','rateAverge','rateCount'],['category','brand','subCategory'])

export const getProduct = getBySlugHandler(Product,"product.notFound",['category','brand','subCategory']);

export const deleteProduct = catchError(async (req,res,next)=>{
    const {slug} = req.params
    const product = await Product.findOne({slug})
    if(!product) return next(new AppError("product.notFound", 404))
    fs,unlinkSync(product.coverImage)
    product.images.forEach(image =>
        fs.unlinkSync(image)
    )
    logAction(req.user.id,'deleted',Product,product._id)
    await product.deleteOne()
    res.status(200).json({
        statusMessage: "success",
        message: req.t("product.deleted"),
    });
})

export const updateProduct = updateBySlugHandler(Product,"product.notFound","product.updated")


