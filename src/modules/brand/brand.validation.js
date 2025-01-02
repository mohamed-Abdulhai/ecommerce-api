import Joi from "joi";

export const addBrandSchema = Joi.object({
    title : Joi.string().min(2).max(32).required().messages({
        "string.min": "brand.titleMin",
        "string.max": "brand.titleMax",
        "any.required": "brand.titleRequired",
        "string.base":"titleString"
    })
})

export const updateBrandSchema = Joi.object({
    title : Joi.string().min(2).max(32).messages({
        "string.min": "brand.titleMin",
        "string.max": "brand.titleMax",
        "string.base":"titleString"
    }),
   slug: Joi.string().required().pattern(/^[a-z0-9-]+$/).messages({
               "string.empty": "globalValidators.slugRequired",
               "string.pattern.base": "globalValidators.slugPattern",
               "any.required": "globalValidators.slugRequired"
    }),
})