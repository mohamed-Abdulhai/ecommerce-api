import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js';
import categoryRouter from '../modules/category/category.router.js';
import brandRouter from "../modules/brand/brand.router.js";
import subCategoryRouter from '../modules/subCategory/subCategory.router.js';
import productRouter from "../modules/proudct/proudct.router.js";
import couponRouter from "../modules/coupon/coupon.router.js"
const router = Router()

router.use('/auth',authRouter)
router.use('/categories',categoryRouter)
router.use('/brands',brandRouter)
router.use('/categories', subCategoryRouter)
router.use('/subcategories',subCategoryRouter)
router.use('/products', productRouter)
router.use('/coupons',couponRouter)

export default router