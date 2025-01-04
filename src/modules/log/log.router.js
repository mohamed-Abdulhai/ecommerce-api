import { Router } from "express"
import { validate } from "../../middlewares/validation.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { getAllSchema, globalId } from "../../validation/global.validation.js";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { ClearLogs, deleteLog, getAllLogs, getLog } from "./log.controller.js";



const router = Router()

router.route('/')
   .get(authentication,authorize(Role.ADMIN),validate(getAllSchema),getAllLogs)
   .delete(authentication,authorize(Role.ADMIN),ClearLogs)
router.route('/:id')
    .get(authentication,authorize(Role.ADMIN),validate(globalId),getLog)
    .delete(authentication,authorize(Role.ADMIN),validate(globalId),deleteLog)


export default router