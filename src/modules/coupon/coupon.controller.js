import { Coupon } from "../../DataBase/models/coupon.model.js";
import { addHandler, deleteByIdHandler, getAllHandler, getByIdHandler, updateByIdHandler } from "../../handler/handler.js";

export const addCoupon = addHandler(Coupon,'coupon.created');

export const getAllCoupons = getAllHandler(Coupon,['code','discount','active']);

export const UpdateCoupon = updateByIdHandler(Coupon,'coupon.notFound','coupon.updated');

export const getCoupon = getByIdHandler(Coupon,'coupon.notFound');

export const deleteCoupon = deleteByIdHandler(Coupon,'coupon.notFound','coupon.deleted');