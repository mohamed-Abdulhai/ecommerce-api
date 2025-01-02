import Joi from "joi";

export const addProductSchema = Joi.object({
    title: Joi.object({
        ar: Joi.string()
            .min(3)
            .max(32)
            .required()
            .messages({
                "string.base": "product.titleString",
                "string.min": "product.titleMin",
                "string.max": "product.titleMax",
                "any.required": "product.titleRequired"
            }),
        en: Joi.string()
            .min(3)
            .max(32)
            .required()
            .messages({
                "string.base": "product.titleString",
                "string.min": "product.titleMin",
                "string.max": "product.titleMax",
                "any.required": "product.titleRequired"
            }),
    }).required().messages({
        "object.base": "product.titleRequired",
        "any.required": "product.titleRequired"
    }),
    slug: Joi.string()
        .required()
        .messages({
            "string.base": "product.titleString",
            "any.required": "product.slugRequired"
        }),
    description: Joi.object({
        ar: Joi.string()
            .required()
            .messages({
                "string.base": "product.titleString",
                "any.required": "product.titleRequired"
            }),
        en: Joi.string()
            .required()
            .messages({
                "string.base": "product.titleString",
                "any.required": "product.titleRequired"
            }),
    }).required().messages({
        "object.base": "product.titleRequired",
        "any.required": "product.titleRequired"
    }),
    price: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "product.priceRequired",
            "number.min": "product.priceMin",
            "any.required": "product.priceRequired"
        }),
    priceAfterDiscount: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "product.priceAfterDiscountRequired",
            "number.min": "product.priceAfterDiscountMin"
        }),
    stock: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "product.stockRequired",
            "number.min": "product.stockMin"
        }),
    category: Joi.string()
        .required()
        .messages({
            "string.base": "product.categoryRequired",
            "any.required": "product.categoryRequired"
        }),
    subCategory: Joi.string()
        .optional()
        .messages({
            "string.base": "product.subCategoryRequired"
        }),
    brand: Joi.string()
        .optional()
        .messages({
            "string.base": "product.brandRequired"
        }),
});

export const updateProductSchema = Joi.object({
    title: Joi.object({
        ar: Joi.string()
            .min(3)
            .max(32)
            .optional()
            .messages({
                "string.base": "product.titleString",
                "string.min": "product.titleMin",
                "string.max": "product.titleMax"
            }),
        en: Joi.string()
            .min(3)
            .max(32)
            .optional()
            .messages({
                "string.base": "product.titleString",
                "string.min": "product.titleMin",
                "string.max": "product.titleMax"
            }),
    }).optional().messages({
        "object.base": "product.titleRequired"
    }),
    slug: Joi.string()
        .optional()
        .messages({
            "string.base": "product.titleString"
        }),
    description: Joi.object({
        ar: Joi.string()
            .optional()
            .messages({
                "string.base": "product.titleString"
            }),
        en: Joi.string()
            .optional()
            .messages({
                "string.base": "product.titleString"
            }),
    }).optional().messages({
        "object.base": "product.titleRequired"
    }),
    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "product.priceRequired",
            "number.min": "product.priceMin"
        }),
    priceAfterDiscount: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "product.priceAfterDiscountRequired",
            "number.min": "product.priceAfterDiscountMin"
        }),
    stock: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "product.stockRequired",
            "number.min": "product.stockMin"
        }),
    category: Joi.string()
        .optional()
        .messages({
            "string.base": "product.categoryRequired"
        }),
    subCategory: Joi.string()
        .optional()
        .messages({
            "string.base": "product.subCategoryRequired"
        }),
    brand: Joi.string()
        .optional()
        .messages({
            "string.base": "product.brandRequired"
        }),
});
