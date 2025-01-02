import Joi from "joi";

export const addSubCategorySchema = Joi.object({
    title: Joi.object({
        ar: Joi.string().required().messages({
            "string.empty": "category.titleRequired",
        }),
        en: Joi.string().required().messages({
            "string.empty": "category.titleRequired", 
        }),
    }).required().messages({
        "object.base": "category.titleObject", 
    }),
});

export const updateSubCategorySchema = Joi.object({
    title: Joi.object({
        ar: Joi.string().required().messages({
            "string.empty": "category.titleRequired", 
        }),
        en: Joi.string().required().messages({
            "string.empty": "category.titleRequired", 
        }),
    }).messages({
        "object.base": "category.titleObject", 
    }),
    category:Joi.string()
    .required()
    .pattern(/^[a-z0-9-]+$/)
    .messages({
        "string.empty": "globalValidators.slugRequired",
        "string.pattern.base": "globalValidators.slugPattern", 
    }),
    slug: Joi.string()
        .required()
        .pattern(/^[a-z0-9-]+$/)
        .messages({
            "string.empty": "globalValidators.slugRequired",
            "string.pattern.base": "globalValidators.slugPattern", 
        }),
});
