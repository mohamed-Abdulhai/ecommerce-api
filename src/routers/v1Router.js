import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js';
import categoryRouter from '../modules/category/category.router.js';
import subCategoryRouter from "../modules/subCategory/subCategoryOutCategory.router.js"
const router = Router()

router.use('/auth',authRouter)
router.use('/categories',categoryRouter)
router.use('/subcategories',subCategoryRouter)


export default router