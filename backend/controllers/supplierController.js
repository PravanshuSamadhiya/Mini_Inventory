import { Supplier } from "../models/Supplier.js"

export const getAllSuppliers = async(req , res) => {
    const suppliers = await Supplier.find();
      res.json(suppliers);
}

export const createSupplier = async (req , res) => {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
}