import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
    discount: {
        type: Number,
        default: 0
    },
    totalPriceAfterDiscount: {
        type: Number,
        default: 0
    }
},{ timestamps: true, versionKey: false });

cartSchema.plugin(mongoosePaginate)

export const Cart = mongoose.model("Cart", cartSchema);