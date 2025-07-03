import { Product } from "../models/Product.js"


export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate('supplier');
    res.json(products)
}

export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
}

export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json(updated);
}

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
}