import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: String,
})

export const Supplier = mongoose.model("Supplier", supplierSchema);
