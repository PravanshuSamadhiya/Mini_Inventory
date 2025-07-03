import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['purchase', 'sale'], required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
})

export const Transaction = mongoose.model("Transaction", transactionSchema);