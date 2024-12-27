import { Router } from "express";
import { changePassword, checkAuth, checkAuthByRole, login, logout, refreshToken, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validation.js";
import { changePasswordSchema, loginSchema, registerSchema } from "./auth.validation.js";
import { authentication , checkEmailOrPhone, checkExistEmail, checkExistPhone, hashPassword } from "./auth.middleware.js";

const router = Router()

router.post('/register',validate(registerSchema),checkExistEmail,checkExistPhone,hashPassword,register)
router.post('/login',validate(loginSchema),checkEmailOrPhone,login)
router.post('/logout',authentication,logout)
router.get('/check-auth',authentication ,checkAuth)
router.get('/check-auth-role',authentication,checkAuthByRole)
router.put('/refresh-token',refreshToken)
router.put('/change-password',authentication,validate(changePasswordSchema),hashPassword,changePassword)


export default router