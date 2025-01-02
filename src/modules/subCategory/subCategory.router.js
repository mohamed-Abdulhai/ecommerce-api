import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { validate } from "../../middlewares/validation.js";
import { addSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";
import { addSubCategory, deleteBySlugSubCategory, getSubCategory, updateBySlugSubCategory } from "./subCategory.controller.js";
import { getAllSchema,globalSlug } from "../../validation/global.validation.js";
import { isTheCategoryExists, theSubCategoryAlreadyExists } from "./subCategory.middlware.js";

const router = Router()
router.route('/')
    .post(authentication,authorize(Role.ADMIN),validate(addSubCategorySchema),isTheCategoryExists,theSubCategoryAlreadyExists,addSubCategory)
    .get(validate(getAllSchema))
router.route('/:slug')
    .get(validate(globalSlug),getSubCategory)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteBySlugSubCategory)
    .put(authentication,authorize(Role.ADMIN),validate(updateSubCategorySchema),isTheCategoryExists,theSubCategoryAlreadyExists,updateBySlugSubCategory)
export default router