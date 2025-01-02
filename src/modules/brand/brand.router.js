import { Router } from "express";
import { addBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { addBrandLogo, exitBrand, slugTheBrand } from "./brand.middlware.js";
import { getAllSchema, globalSlug } from "../../validation/global.validation.js";
import { validate } from "../../middlewares/validation.js";
import { upload } from "../../middlewares/upload.js";
import { validateImageFile } from "../../middlewares/imageValidations.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { authentication, authorize } from "../auth/auth.middleware.js";
import { addBrand, deleteBySlugBrand, getAllBrands, getBrand } from "./brand.controller.js";

const router = Router()
router.route('/')
.post(authentication,authorize(Role.ADMIN),upload.single('logo'),validateImageFile(true),validate(addBrandSchema),addBrandLogo,exitBrand,slugTheBrand,addBrand)
    .get(validate(getAllSchema), getAllBrands)
router.route('/:slug')
    .get(validate(globalSlug), getBrand)
    .delete(authentication,authorize(Role.ADMIN),validate(globalSlug),deleteBySlugBrand);
export default router