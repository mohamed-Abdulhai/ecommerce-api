import { Router } from "express";
import { validate } from "../../middlewares/validation";
import { getAllSchema, globalSlug } from "../../validation/global.validation";
import { getAllSubCategories, getSubCategoryBySlug } from "./subCategoy.controller";

const router = Router()

router.get('/',validate(getAllSchema),getAllSubCategories)
router.get('/:slug',validate(globalSlug),getSubCategoryBySlug)



export default router