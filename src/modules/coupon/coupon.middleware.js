import { Coupon } from "../../DataBase/models/coupon.model.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const existCoupon = catchError(async (req,res,next)=>{

        const coupon = await Coupon.findOne({code:req.body.code})
        if(coupon){
            return next(new AppError('coupon.alreadyExists'),409)
        }
    return next()
})