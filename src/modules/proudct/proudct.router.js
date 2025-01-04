import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { upload } from "../../middlewares/upload.js";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./proudct.controller.js";
import { addProductSchema, updateProductSchema } from "./proudct.validation.js";
import { validate } from "../../middlewares/validation.js";
import { getAllSchema, globalSlug } from "../../validation/global.validation.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { isTheCategoryExists } from "../subCategory/subCategory.middlware.js";
import { addFilesToRequestBodyInProuduct, ExistProduct, isTheBraandExist, validateImageFiles } from "./proudct.middleware.js";

const router = Router()

router.route('/')
    .post(authentication,authorize(Role.ADMIN),upload.fields([
        { name: 'coverImage',maxCount:1},
        { name: 'images',maxCount:5}
    ]),validate(addProductSchema),validateImageFiles(true),addFilesToRequestBodyInProuduct,ExistProduct,isTheCategoryExists,isTheCategoryExists,isTheBraandExist,addProduct)
    .get(validate(getAllSchema),getAllProducts)
router.route('/:slug')
    .get(validate(globalSlug),getProduct)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteProduct)
    .put(authentication,authorize(Role.ADMIN),validate(updateProductSchema),updateProduct)
export default router