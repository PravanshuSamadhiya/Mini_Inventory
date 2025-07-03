import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();


const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mini-inventory-ashy.vercel.app/'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT =  4000

app.use('/api/products',productRoutes);
app.use('/api/suppliers',supplierRoutes);
app.use('/api/transactions',transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Mini ERP Backend Running');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`server will be connected at ${PORT}`)
})