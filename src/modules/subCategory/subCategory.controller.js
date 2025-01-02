import fs from 'fs';
import { Category } from "../../DataBase/models/category.model.js";
import { addHandler, deleteBySlugHandler, getAllHandler, getBySlugHandler, logAction, updateBySlugHandler } from "../../handler/handler.js";
import { AppError, catchError } from "../../utilities/error/error.js";
import { SubCategory } from '../../DataBase/models/subCategory.model.js';

export const addSubCategory = addHandler(SubCategory,"subCategory.created")

export const getAllSubCategories = getAllHandler(SubCategory,['title.ar','title.en'],['category'])

export const getSubCategory = getBySlugHandler(SubCategory,"subCategory.notFound")

export const deleteBySlugSubCategory = deleteBySlugHandler(SubCategory,"subCategory.notFound",'subCategory.deleted')

export const updateBySlugSubCategory = updateBySlugHandler(SubCategory,"subCategory.notFound",'subCategory.updated')