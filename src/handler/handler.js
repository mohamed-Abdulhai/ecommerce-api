import { Log } from "../DataBase/models/Log.model.js";
import { AppError, catchError } from "../utilities/error/error.js";

// Helper function for logging actions
export const logAction = async (userId, action, model, itemId) => {
    await Log.create({
        actionBy: userId,
        action,
        collectionName: model.collection.name,
        item: itemId,
    });
};


export const getAllHandler = (model, searchFields, populateFields) => {
    return catchError(async (req, res, next) => {
        const { search, page = 1, limit = 10 } = req.query;

        const searchQuery = search
            ? { $or: searchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })) }
            : {};

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            customLabels: {
                totalDocs: "totalDocuments",
                docs: "documents",
            },
            sort: { createdAt: -1 },
            populate: populateFields || [],
        };

        const items = await model.paginate(searchQuery, options);

        res.json({
            statusMessage: 'success',
            data: items,
        });
    });
};
export const addHandler = (model, message) => {
    return catchError(async (req, res, next) => {
        const newItem = new model(req.body);
        const createdItem = await newItem.save();
        await logAction(req.user.id, "created", model, createdItem.id);

        res.status(201).json({
            statusMessage: 'success',
            message: req.t(message),
            data: createdItem
        });
    });
};

export const getByIdHandler = (model, failedMessage, populateFields) => {
    return catchError(async (req, res, next) => {
        const { id } = req.params;
        const query = model.findById(id);

        if (populateFields && populateFields.length > 0) {
            query.populate(populateFields);
        }

        const item = await query;

        if (!item) {
            return next(new AppError(failedMessage, 404));
        }

        res.json({
            statusMessage: 'success',
            data: item,
        });
    });
};

export const updateByIdHandler = (model, failedMessage, message) => {
    return catchError(async (req, res, next) => {
        const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return next(new AppError(failedMessage, 404));
        await logAction(req.user.id, "updated", model, item.id);

        res.json({
            statusMessage: 'success',
            message: req.t(message),
            data: item
        });
    });
};

export const deleteByIdHandler = (model, failedMessage, message) => {
    return catchError(async (req, res, next) => {
        const item = await model.findByIdAndDelete(req.params.id);
        if (!item) return next(new AppError(failedMessage, 404));
        await logAction(req.user.id, "deleted", model, item.id);

        res.json({
            statusMessage: 'success',
            message: req.t(message),
            data: item
        });
    });
};

export const getBySlugHandler = (model, failedMessage, populateFields) => {
    return catchError(async (req, res, next) => {
        const { slug } = req.params;
        const query = model.findOne({ slug });

        if (populateFields && populateFields.length > 0) {
            query.populate(populateFields);
        }

        const item = await query;

        if (!item) {
            return next(new AppError(failedMessage, 404));
        }

        res.json({
            statusMessage: 'success',
            data: item,
        });
    });
};

export const updateBySlugHandler = (model, failedMessage, message) => {
    return catchError(async (req, res, next) => {
        const item = await model.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, runValidators: true });
        if (!item) return next(new AppError(failedMessage, 404));
        await logAction(req.user.id, "updated", model, item.id);

        res.json({
            statusMessage: 'success',
            message: req.t(message),
            data: item
        });
    });
};

export const deleteBySlugHandler = (model, failedMessage, message) => {
    return catchError(async (req, res, next) => {
        const item = await model.findOneAndDelete({ slug: req.params.slug });
        if (!item) return next(new AppError(failedMessage, 404));
        await logAction(req.user.id, "deleted", model, item.id);

        res.json({
            statusMessage: 'success',
            message: req.t(message),
            data: item
        });
    });
};
