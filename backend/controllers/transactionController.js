import { Product } from "../models/Product.js";
import { Transaction } from "../models/Transaction.js";

export const getAllTransactions = async (req, res) => {
    const txns = await Transaction.find().populate('product');
    res.json(txns);
}

export const createTransaction = async (req, res) => {
    const { type, product, quantity } = req.body;
    const txn = await Transaction.create({ type, product, quantity });

    const productDoc = await Product.findById(product);
    if (type === 'purchase') productDoc.stock += quantity;
    else if (type === 'sale') productDoc.stock -= quantity;
    await productDoc.save();

    res.status(201).json(txn);
}

