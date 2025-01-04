import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { validate } from "../../middlewares/validation.js";
import { addSubCategorySchema } from "./subCategory.validation.js";
import { addSubCategory, deleteBySlugSubCategory, getAllSubCategories, getSubCategory } from "./subCategory.controller.js";
import { getAllSchema,globalSlug } from "../../validation/global.validation.js";
import { isTheCategoryExists, theSubCategoryAlreadyExists } from "./subCategory.middlware.js";
import { slugTheCategory } from "../category/category.middleware.js";

const router = Router()
router.route('/')
    .post(authentication,authorize(Role.ADMIN),validate(addSubCategorySchema),isTheCategoryExists,theSubCategoryAlreadyExists,slugTheCategory,addSubCategory)
    .get(validate(getAllSchema),getAllSubCategories)
router.route('/:slug')
    .get(validate(globalSlug),getSubCategory)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteBySlugSubCategory)
export default router