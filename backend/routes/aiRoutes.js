import express from "express";
import axios from "axios";
import { Transaction } from "../models/Transaction.js";
import { Product } from "../models/Product.js";
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/reorder-suggestion/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const transactions = await Transaction.find({ product: productId }).sort({ date: -1 }).limit(10);

        const recentTransactions = transactions.map((t) => ({
            type: t.type,
            quantity: t.quantity,
            date: t.date.toISOString().split('T')[0],
        }));

        const prompt = `
You are an inventory assistant.

Product: ${product.name}
Current Stock: ${product.stock}
Recent Transactions:
${JSON.stringify(recentTransactions, null, 2)}

Based on past sales and current stock, how many units should be reordered?
Respond with only the number (an integer). No explanation.
`;

        const geminiRes = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const raw = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        const reorderQuantity = parseInt(raw);
        if (isNaN(reorderQuantity)) {
            return res.status(400).json({ error: 'Gemini returned non-numeric', raw });
        }

        res.json({ reorderQuantity });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gemini reorder suggestion failed', message: err.message });
    }
});

export default router;