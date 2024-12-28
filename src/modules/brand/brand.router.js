import { Router } from "express";
import { addBrandSchema, updateBrandSchema } from "./brand.validation";
import { addBrandLogo, exitBrand, slugTheBrand } from "./brand.middlware";
import { getAllSchema, globalSlug } from "../../validation/global.validation";
import { validate } from "../../middlewares/validation";
import { upload } from "../../middlewares/upload";
import { validateImageFile } from "../../middlewares/imageValidations";
import { Role } from "../../utilities/enum/userRole.enum";
import { authentication, authorize } from "../auth/auth.middleware";
import { addBrand, getAllBrands, getBrand, updateBySlugBrand } from "./brand.controller";
import { deleteBySlugCategory } from "../category/category.controller";

const router = Router()

.post(authentication,authorize(Role.ADMIN),upload.single('logo'),validateImageFile(true),validate(addBrandSchema),addBrandLogo,exitBrand,slugTheBrand,addBrand)
    .get(validate(getAllSchema), getAllBrands);
router.route('/:slug')
    .get(validate(globalSlug), getBrand)
    .put(authentication,authorize(Role.ADMIN),upload.single('image'),validateImageFile(false),validate(updateBrandSchema),exitBrand,slugTheBrand,updateBySlugBrand)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteBySlugCategory);
export default router