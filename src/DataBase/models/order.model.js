import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, min: 0 },
    paymentMethod: {
        type: String,
        enum: ["cash", "card"], 
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    shippingAddress: {
        city: { type: String, required: true }, 
        street: { type: String, required: true }, 
        building: { type: String, required: true }, 
        phone: { type: String, required: true }, 
    },
    transactionId: { type: String }, 
    notes: { type: String },
    deliveredAt:Date,

}, { timestamps: true, versionKey: false });

schema.plugin(mongoosePaginate);

export const Order = mongoose.model("Order", schema);