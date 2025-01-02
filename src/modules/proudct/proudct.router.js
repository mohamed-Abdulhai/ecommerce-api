import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { upload } from "../../middlewares/upload.js";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./proudct.controller.js";
import { addProductSchema, updateProductSchema } from "./proudct.validation.js";
import { validate } from "../../middlewares/validation.js";
import { getAllSchema, globalSlug } from "../../validation/global.validation.js";
import { Role } from "../../utilities/enum/userRole.enum.js";

const router = Router()

router.route('/')
    .post(authentication,authorize(Role.ADMIN),upload.fields([
        { name: 'coverImage',maxCount:1},
        { name: 'images',maxCount:5}
    ]),validate(addProductSchema),addProduct)
    .get(validate(getAllSchema),getAllProducts)
router.route('/:slug')
    .get(validate(globalSlug),getProduct)
    .delete(validate(globalSlug),deleteProduct)
    .put(authentication,authorize(Role.ADMIN),upload.fields([
        { name: 'coverImage', maxCount:1},
        { name: 'images', maxCount:5}
        ]),validate(updateProductSchema),updateProduct)
    

export default router