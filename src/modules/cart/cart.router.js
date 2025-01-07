import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import {
    addToCart,
    applyCoupon,
    clearTheCart,
    deleteFromCart,
    getAllCarts,
    getCartByUser,
    getUserCartByAdmin,
    updateCartItem,
} from "./cart.controller.js";
import { validate } from "../../middlewares/validation.js";
import { getAllSchema, globalId } from "../../validation/global.validation.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { addToCartSchema, applyCouponSchema, deleteFromCartSchema, updateCartSchema } from "./cart.validation.js";

const router = Router();

router
    .route("/")
    .get(authentication, getCartByUser)
    .post(authentication, validate(addToCartSchema), addToCart)
    .put(authentication, validate(updateCartSchema), updateCartItem)
    .delete(authentication, validate(deleteFromCartSchema), deleteFromCart);
router.post('/apply-coupon',authentication,validate(applyCouponSchema),applyCoupon)
router.delete("/clear", authentication, clearTheCart);

router.get("/admin", authentication, authorize(Role.ADMIN), validate(getAllSchema), getAllCarts);
router.get("/admin/:id", authentication, authorize(Role.ADMIN), validate(globalId), getUserCartByAdmin);


export default router;