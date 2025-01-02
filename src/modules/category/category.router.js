import { Router } from "express";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { upload } from "../../middlewares/upload.js";
import { validateImageFile } from "../../middlewares/imageValidations.js";
import { validate } from "../../middlewares/validation.js";
import { addCategorySchema } from "./category.validation.js";
import { addCategoryImage, exitCategory, slugTheCategory } from "./category.middleware.js";
import { addCategory, deleteBySlugCategory, getAllCategories, getCategory } from "./category.controller.js";
import { getAllSchema, globalSlug } from "../../validation/global.validation.js";

const router = Router();

router.route('/')
    .post(authentication,authorize(Role.ADMIN),upload.single('image'),validateImageFile(true),validate(addCategorySchema),addCategoryImage,exitCategory,slugTheCategory,addCategory)
    .get(validate(getAllSchema), getAllCategories);
router.route('/:slug')
    .get(validate(globalSlug), getCategory)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteBySlugCategory);
export default router;
