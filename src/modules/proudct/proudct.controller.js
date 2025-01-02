import { Product } from "../../DataBase/models/product.model.js";
import { addHandler, getAllHandler, getBySlugHandler } from "../../handler/handler.js";
import { catchError } from "../../utilities/error/error.js";

export const addProduct = addHandler(Product,"product.created");

export const getAllProducts = getAllHandler(Product,['title.ar','title.en','description.en','description.ar','price','priceAfterDiscount','rateAverge','rateCount'],['category','brand','subcategory'])

export const getProduct = getBySlugHandler(Product,"product.notFound",['category','brand','subcategory']);

export const deleteProduct = catchError(async (req,res,next)=>{

})

export const updateProduct = catchError(async (req,res,next)=>{

})
