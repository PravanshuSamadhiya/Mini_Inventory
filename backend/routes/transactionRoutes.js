import express from "express";
import { createTransaction, getAllTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', createTransaction);

export default router;