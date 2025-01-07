import Joi from "joi";

export const addToCartSchema = Joi.object({
    productId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex": "globalValidators.stringId",
            "string.length": "globalValidators.lengthId",
            "any.required": "globalValidators.idRequired",
        }),
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "cart.invalidQuantity",
            "number.integer": "cart.invalidQuantity",
            "number.min": "cart.quantityMin",
            "any.required": "cart.quantityRequired",
        }),
});

export const deleteFromCartSchema = Joi.object({
    productId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex": "globalValidators.stringId",
            "string.length": "globalValidators.lengthId",
            "any.required": "globalValidators.idRequired",
        }),
});

export const updateCartSchema = Joi.object({
    productId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex": "globalValidators.stringId",
            "string.length": "globalValidators.lengthId",
            "any.required": "globalValidators.idRequired",
        }),
    quantity: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "cart.invalidQuantity",
            "number.integer": "cart.quantityInteger",
            "number.min": "cart.quantityMin",
            "any.required": "cart.quantityRequired",
        }),
});


export const applyCouponSchema = Joi.object({
    code: Joi.string()
        .required()
        .messages({
            "string.empty": "coupon.codeRequired",
            "any.required": "coupon.codeRequired",
        }),
})