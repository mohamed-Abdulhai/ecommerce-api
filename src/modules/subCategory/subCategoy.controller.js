import { SubCategory } from "../../DataBase/models/subCategory.model.js";
import { addHandler, deleteBySlugHandler, getAllHandler, getBySlugHandler, updateBySlugHandler } from "../../handler/handler.js";
import { catchError } from "../../utilities/error/error.js";

export const addSubCategory = addHandler(SubCategory,"subCategory.created")

export const getAllSubCategories = getAllHandler(SubCategory,['title.ar','title.en','category'],['category'])

export const getSubCategoryBySlug = getBySlugHandler(SubCategory,'subCategory.notFound',['category'])

export const updateBySlugSubCategory = updateBySlugHandler(SubCategory,'subCategory.notFound','subCategory.updated')

export const deleteBySlugSubCategory = deleteBySlugHandler(SubCategory,'subCategory.notFound','subCategory.deleted')

export const getAllSubCategoriesByCategory = catchError(async (req, res, next) => {
    const { search, page = 1, limit = 10 } = req.query;
    const { category } = req.params; 

    
    const searchQuery = {
        category, 
        ...(search
            ? { $or: searchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })) }
            : {}),
    };

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        customLabels: {
            totalDocs: "totalSubCategories",
            docs: "documents",
        },
        sort: { createdAt: -1 },
        populate: populateFields || [],
    };

    const items = await SubCategory.paginate(searchQuery, options);

    res.json({
        statusMessage: 'success',
        data: items,
    });
});
