import { Router } from "express";
import { authentication, authorize, checkExistEmail, checkExistPhone, hashPassword } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { validate } from "../../middlewares/validation.js";
import { getAllSchema, globalId } from "../../validation/global.validation.js";
import { changeRoleByAdmin, deleteUser, getAllStaff, getAllUsers, getProfile, getUser, updateUser } from "./user.controller.js";
import { isTheUserOrAdmin } from "./user.middleware.js";
import { changePasswordByAdminSchema, changeRoleByAdminSchema, updateUserSchema } from "./user.validation.js";

const router = Router()


router.get("/",authentication,authorize(Role.ADMIN),validate(getAllSchema),getAllUsers)
router.get('/profile',authentication,getProfile)
router.put('/admin-change-password/:id',authentication,authorize(Role.ADMIN),validate(changePasswordByAdminSchema),hashPassword,updateUser)
router.get('/admin-staff',authentication,authorize(Role.ADMIN),validate(getAllSchema),getAllStaff)
router.put('/admin-change-role/:id',authentication,authorize(Role.ADMIN),validate(changeRoleByAdminSchema),changeRoleByAdmin)
router.route('/:id')
.get(authentication,authorize(Role.ADMIN,Role.STAFF),validate(globalId),getUser)
.put(authentication,validate(updateUserSchema),isTheUserOrAdmin,checkExistEmail,checkExistPhone,updateUser)
.delete(authentication,validate(globalId),isTheUserOrAdmin,deleteUser)



export default router