import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
})

export const Product = mongoose.model("Product", productSchema);