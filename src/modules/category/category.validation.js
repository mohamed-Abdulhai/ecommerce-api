import Joi from "joi";

export const addCategorySchema = Joi.object({
    title: Joi.object({
        ar: Joi.string().required().messages({
            "string.empty": "category.titleRequired",
        }),
        en: Joi.string().required().messages({
            "string.empty": "Title in English is required.", 
        }),
    }).required().messages({
        "object.base": "category.titleObject", 
    }),
});

export const updateCategorySchema = Joi.object({
    title: Joi.object({
        ar: Joi.string().required().messages({
            "string.empty": "category.titleRequired", 
        }),
        en: Joi.string().required().messages({
            "string.empty": "Title in English is required.", 
        }),
    }).messages({
        "object.base": "category.titleObject", 
    }),
    slug: Joi.string()
        .required()
        .pattern(/^[a-z0-9-]+$/)
        .messages({
            "string.empty": "globalValidators.slugRequired",
            "string.pattern.base": "globalValidators.slugPattern", 
        }),
});
