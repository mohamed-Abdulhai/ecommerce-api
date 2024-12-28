import { Router } from "express";
import { validate } from "../../middlewares/validation.js";
import { getAllSchema } from "../../validation/global.validation.js";
import { addSubCategory, deleteBySlugSubCategory, getAllSubCategories, getAllSubCategoriesByCategory, getSubCategoryBySlug, updateBySlugSubCategory } from "./subCategoy.controller.js";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { addSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";

const router = Router({mergeParams:true})

router.route('/')
  .get(validate(getAllSchema),getAllSubCategoriesByCategory)
  .post(authentication,authorize(Role.ADMIN),validate(addSubCategorySchema),addSubCategory)

router.route('/:slug')
  .get(validate(getSubCategorySchema),getSubCategoryBySlug)
  .put(authentication,authorize(Role.ADMIN),validate(updateSubCategorySchema),updateBySlugSubCategory)
  .delete(authentication,authorize(Role.ADMIN),validate(getSubCategorySchema),deleteBySlugSubCategory)
export default router