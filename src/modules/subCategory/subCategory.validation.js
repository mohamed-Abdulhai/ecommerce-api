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
    category:Joi.string()
            .hex()
            .length(24)
            .required()
            .messages({
                "string.hex": "globalValidators.stringId",
                "string.length": "globalValidators.lengthId",
                "any.required": "globalValidators.idRequired",
            }),
});

