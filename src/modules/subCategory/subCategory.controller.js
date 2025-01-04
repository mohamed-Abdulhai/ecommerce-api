import { addHandler, deleteBySlugHandler, getAllHandler, getBySlugHandler } from "../../handler/handler.js";
import { SubCategory } from '../../DataBase/models/subCategory.model.js';

export const addSubCategory = addHandler(SubCategory,"subCategory.created")

export const getAllSubCategories = getAllHandler(SubCategory,['title.ar','title.en'],['category'])

export const getSubCategory = getBySlugHandler(SubCategory,"subCategory.notFound",['category'])

export const deleteBySlugSubCategory = deleteBySlugHandler(SubCategory,"subCategory.notFound",'subCategory.deleted')
