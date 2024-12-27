import Joi from "joi";

export const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(50).required().messages({
        "string.min": "auth.userNameMin",
        "string.max": "auth.userNameMax",
        "any.required": "auth.userNameRequired",
    }),
    email: Joi.string().email().pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
        "string.email": "auth.emailString",
        "string.pattern.base": "auth.emailPattern",
    }),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
        "string.pattern.base": "auth.phoneString",
        "any.required": "auth.phoneRequired",
    }),
    password: Joi.string().min(5).max(50).required().messages({
        "string.min": "auth.passwordMin",
        "string.max": "auth.passwordMax",
        "any.required": "auth.passwordRequired",
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
        "string.email": "auth.emailString",
        "string.pattern.base": "auth.emailPattern",
    }),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).messages({
        "string.pattern.base": "auth.phoneString",
    }),
    password: Joi.string().min(5).max(50).required().messages({
        "string.min": "auth.passwordMin",
        "string.max": "auth.passwordMax",
        "any.required": "auth.passwordRequired",
    }),
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(5).max(255).required().messages({
       "string.min": "auth.passwordMin",
        "string.max": "auth.passwordMax",
        "any.required": "auth.OldPaswordRequired",
    }),
    password: Joi.string().min(5).max(255).required().messages({
        "string.min": "auth.passwordMin",
        "string.max": "auth.passwordMax",
        "any.required": "auth.passwordRequired",
    }),
});
