import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { existCoupon } from "./coupon.middleware.js";
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, UpdateCoupon } from "./coupon.controller.js";
import { validate } from "../../middlewares/validation.js";
import { addCouponSchema, updateCouponSchema } from "./coupon.validation.js";

const router = Router()

router.route('/')
  .post(authentication,authorize(Role.ADMIN),validate(addCouponSchema),existCoupon,addCoupon)
  .get(authentication,authorize(Role.ADMIN,Role.STAFF),getAllCoupons)
router.route('/:id')
  .get(authentication,authorize(Role.ADMIN, Role.STAFF), getCoupon)
  .delete(authentication,authorize(Role.ADMIN),deleteCoupon)
  .put(authentication,authorize(Role.ADMIN),validate(updateCouponSchema),UpdateCoupon)
export default router