import { Cart } from "../../DataBase/models/cart.model.js";
import { Product } from "../../DataBase/models/product.model.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const addToCart = catchError(async (req, res, next) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
        return next(new AppError("cart.invalidProduct", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError("product.notFound", 404));
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    res.status(200).json({
        status: "success",
        message: req.t("cart.itemAdded"),
        data: cart,
    });
});

export const getCartByUser = catchError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart) {
        return next(new AppError("cart.notFound", 404));
    }

    res.status(200).json({
        status: "success",
        data: cart,
    });
});

export const updateCartItem = catchError(async (req, res, next) => {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        return next(new AppError("cart.notFound", 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        if (quantity === 0) {
            return next(new AppError("cart.invalidQuantity", 400));
        }

        cart.items[itemIndex].quantity = quantity;
        cart.totalPrice = await calculateTotalPrice(cart.items);
        await cart.save();

        res.status(200).json({
            status: "success",
            message: req.t("cart.updated"),
            data: cart,
        });
    } else {
        return next(new AppError("product.notFound", 404));
    }
});

export const deleteFromCart = catchError(async (req, res, next) => {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        return next(new AppError("cart.notFound", 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        cart.totalPrice = await calculateTotalPrice(cart.items);
        await cart.save();

        res.status(200).json({
            status: "success",
            message: req.t("cart.itemDeleted"),
            data: cart,
        });
    } else {
        return next(new AppError("product.notFound", 404));
    }
});

export const clearTheCart = catchError(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { items: [], totalPrice: 0 },
        { new: true }
    );

    if (!cart) {
        return next(new AppError("cart.notFound", 404));
    }

    res.status(200).json({
        status: "success",
        message: req.t("cart.cleard"),
        data: cart,
    });
});

export const getAllCarts = catchError(async (req, res, next) => {
    const { search, page = 1, limit = 10 } = req.query;

    const userSearchFields = ['user.name', 'user.email']; 
    const productSearchFields = ['items.product.name', 'items.product.description'];

    let searchQuery = {};
    if (search) {
        searchQuery = {
            $or: [
                ...userSearchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })),
                ...productSearchFields.map(field => ({ [field]: { $regex: search, $options: "i" } })),
            ],
        };
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        customLabels: {
            totalDocs: `totalCats`,
            docs: `carts`,
        },
        sort: { createdAt: -1 },
        populate: [
            { path: 'user', select: '-password' }, 
            { path: 'items.product' } 
        ],
    };

    const carts = await Cart.paginate(searchQuery, options);

    res.json({
        statusMessage: 'success',
        data: carts,
    });
});

export const getUserCartByAdmin = catchError(async (req, res, next) => {
    const { id } = req.params;

    const cart = await Cart.findOne({ user: id })
        .populate({
            path: 'user',
            select: '-password', 
        })
        .populate('items.product'); 

    if (!cart) {
        return next(new AppError("cart.notFound", 404));
    }

    res.status(200).json({
        status: "success",
        data: cart,
    });
});

const calculateTotalPrice = async (items) => {
    const productPrices = await Promise.all(
        items.map(async (item) => {
            const product = await Product.findById(item.product);
            return product.price * item.quantity;
        })
    );

    return productPrices.reduce((total, price) => total + price, 0);
};