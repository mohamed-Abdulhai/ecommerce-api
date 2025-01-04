import fs from "fs/promises";
import { AppError, catchError } from "../../utilities/error/error.js";
import { Category } from "../../DataBase/models/category.model.js";
import { SubCategory } from "../../DataBase/models/subCategory.model.js";
import { Brand } from "../../DataBase/models/brand.model.js";
import { Product } from "../../DataBase/models/product.model.js";

export const validateImageFiles = (required = true) =>
  catchError(async (req, res, next) => {
    const files = {
      coverImage: req.files?.coverImage?.[0],
      images: req.files?.images || [],
    };

    const allFiles = [
      ...(files.coverImage ? [files.coverImage] : []),
      ...files.images,
    ];

    if (required && !files.coverImage && files.images.length === 0) {
      await deleteAllFiles(allFiles);
      return next(new AppError("image.imageRequired", 400));
    }

    if (files.coverImage && !files.coverImage.mimetype.startsWith("image/")) {
      await deleteAllFiles(allFiles);
      return next(new AppError("image.invalidCoverImageType", 400));
    }

    for (const file of files.images) {
      if (!file.mimetype.startsWith("image/")) {
        await deleteAllFiles(allFiles);
        return next(new AppError("image.invalidImageType", 400));
      }
    }

    next();
  });

const deleteAllFiles = async (files) => {
  for (const file of files) {
    try {
      await fs.unlink(file.path);
    } catch (err) {
      // Log error if needed, but ignore to avoid disrupting flow
    }
  }
};

export const addFilesToRequestBodyInProuduct = catchError(async (req, res, next) => {
  if (req.files?.coverImage?.[0]) {
    req.body.coverImage = req.files.coverImage[0].path;
  }

  if (req.files?.images) {
    req.body.images = req.files.images.map((file) => file.path);
  }

  next();
});

export const isThecategoryExist = catchError(async (req, res, next) => {
  const files = {
    coverImage: req.files?.coverImage?.[0],
    images: req.files?.images || [],
  };

  const allFiles = [
    ...(files.coverImage ? [files.coverImage] : []),
    ...files.images,
  ];

  const category = await Category.findById(req.body.category);
  if (!category) {
    await deleteAllFiles(allFiles);
    return next(new AppError("Category.notFound", 404));
  }

  next();
});

export const isTheSubcategoryExist = catchError(async (req, res, next) => {
  const files = {
    coverImage: req.files?.coverImage?.[0],
    images: req.files?.images || [],
  };

  const allFiles = [
    ...(files.coverImage ? [files.coverImage] : []),
    ...files.images,
  ];

  const subCategory = await SubCategory.findById(req.body.subCategory);
  if (!subCategory) {
    await deleteAllFiles(allFiles);
    return next(new AppError("subCategory.notFound", 404));
  }

  next();
});

export const isTheBraandExist = catchError(async (req, res, next) => {
  const files = {
    coverImage: req.files?.coverImage?.[0],
    images: req.files?.images || [],
  };

  const allFiles = [
    ...(files.coverImage ? [files.coverImage] : []),
    ...files.images,
  ];

  const brand = await Brand.findById(req.body.brand);
  if (!brand) {
    await deleteAllFiles(allFiles);
    return next(new AppError("brand.notFound", 404));
  }

  next();
});

export const ExistProduct = catchError(async (req, res, next) => {
  const files = {
    coverImage: req.files?.coverImage?.[0],
    images: req.files?.images || [],
  };

  const allFiles = [
    ...(files.coverImage ? [files.coverImage] : []),
    ...files.images,
  ];

  const product = await Product.findOne({ "title.en": req.body.title.en });
  if (product) {
    await deleteAllFiles(allFiles);
    return next(new AppError("product.alreadyExists", 409));
  }

  next();
});
