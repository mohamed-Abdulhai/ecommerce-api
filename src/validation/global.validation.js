import Joi from "joi"

export const getAllSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'globalValidators.getAllPageNumber',
        'number.integer': 'globalValidators.getAllPageInteger',
        'number.min': 'globalValidators.getAllPageMin',
    }),
    limit: Joi.number().integer().min(1).default(10).messages({
        'number.base': 'globalValidators.getAllLimitNumber',
        'number.integer': 'globalValidators.getAllLimitInteger',
        'number.min': 'globalValidators.getAllLimitMin',
    }),
    search: Joi.string()
        .allow('')
        .trim()
        .messages({
            'string.base': 'globalValidators.getAllSearchString',
            'string.empty': 'globalValidators.getAllSearchEmpty'
        }),
})

export const globalSlug = Joi.object({
    slug: Joi.string().required().pattern(/^[a-z0-9-]+$/).messages({
            "string.empty": "globalValidators.slugRequired",
            "string.pattern.base": "globalValidators.slugPattern",
            "any.required": "globalValidators.slugRequired"
        }),
})