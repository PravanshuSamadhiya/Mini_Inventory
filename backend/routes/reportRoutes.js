import express from "express";
import { Product } from "../models/Product.js";
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const products = await Product.find();

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const lowStock = products.filter(p => p.stock < 10);

  res.json({ totalProducts, totalValue, lowStock });
});

export default router;