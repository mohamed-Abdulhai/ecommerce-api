import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js';
import userRouter from "../modules/user/user.router.js"
import categoryRouter from '../modules/category/category.router.js';
import brandRouter from "../modules/brand/brand.router.js";
import subCategoryRouter from '../modules/subCategory/subCategory.router.js';
import productRouter from "../modules/proudct/proudct.router.js";
import couponRouter from "../modules/coupon/coupon.router.js";
import cartRouter from "../modules/cart/cart.router.js";
import orderRouter from "../modules/order/order.router.js"
import addressRouter from "../modules/address/address.router.js"
import wishlistRouter from "../modules/wishlist/wishlist.router.js"
import logRouter from "../modules/log/log.router.js"
const router = Router()

router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/categories',categoryRouter)
router.use('/brands',brandRouter)
router.use('/subcategories',subCategoryRouter)
router.use('/products', productRouter)
router.use('/coupons',couponRouter)
router.use('/cart', cartRouter)
router.use('/orders', orderRouter)
router.use('/addresses',addressRouter)
router.use('/wishlists',wishlistRouter)
router.use('/logs',logRouter)

export default router