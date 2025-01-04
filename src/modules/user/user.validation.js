import Joi from "joi";
import { Role } from "../../utilities/enum/userRole.enum.js";

export const updateUserSchema = Joi.object({
    userName: Joi.string().min(3).max(50).messages({
            "string.min": "auth.userNameMin",
            "string.max": "auth.userNameMax",
        }),
    email: Joi.string().email().pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
            "string.email": "auth.emailString",
            "string.pattern.base": "auth.emailPattern",
        }),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).messages({
            "string.pattern.base": "auth.phoneString",
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

export const changePasswordByAdminSchema = Joi.object({
    password: Joi.string().min(5).max(50).required().messages({
            "string.min": "auth.passwordMin",
            "string.max": "auth.passwordMax",
            "any.required": "auth.passwordRequired",
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

export const changeRoleByAdminSchema = Joi.object({
    role: Joi.string().valid(Role.ADMIN, Role.STAFF, Role.USER).required().messages({
            "string.valid": "auth.roleValid",
            "any.required": "auth.roleRequired",
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