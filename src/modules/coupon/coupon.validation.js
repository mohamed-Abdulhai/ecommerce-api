import Joi from "joi";

// Add Coupon Validation Schema
export const addCouponSchema = Joi.object({
    code: Joi.string()
        .required()
        .messages({
            "string.empty": "coupon.codeRequired",
            "any.required": "coupon.codeRequired",
        }),
    discount: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            "number.base": "coupon.discontNumberBase",
            "number.min": "coupon.discountNumberMin",
            "number.max": "coupon.discountNumberMax",
            "any.required": "coupon.discountNumberRequired",
        }),
    active: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "coupon.activeBoolean",
        }),
    expires: Joi.date()
        .required()
        .messages({
            "date.base": "coupon.expiresDate",
            "any.required": "coupon.expiresDateRequired",
        }),
});

// Update Coupon Validation Schema
export const updateCouponSchema = Joi.object({
    discount: Joi.number()
        .min(0)
        .max(100)
        .messages({
            "number.base": "coupon.discontNumberBase",
            "number.min": "coupon.discountNumberMin",
            "number.max": "coupon.discountNumberMax",
        }),
    active: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "coupon.activeBoolean",
        }),
    expires: Joi.date()
        .messages({
            "date.base": "coupon.expiresDate",
        }),
    id: Joi.string()
            .hex()
            .length(24)
            .required()
            .messages({
                "string.hex": "globalValidators.stringId",
                "string.length": "globalValidators.lengthId",
                "any.required": "globalValidators.idRequired",
    }),
})
