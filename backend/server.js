import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json()); // allow the app to accept json data in req.body
app.post("/api/products", async (req, res) => {
  const product = req.body; // user sends this data to database to create product
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ success: false, message: "server error" });
    console.log("error in creating product", console.error);
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "product not found" });
  }

  try {
    await Product.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({ success: true, message: "Updated successfully", updatedData });
  } catch (error) {
    console.error("Error occured while updating", error.message);
    res.status(404).json({ success: false, message: "product not found" });
  }
});
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(404).json({ status: false, message: "product not found" });
    console.log("error in deleting products", error.message);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: "server error" });
    console.log("error in finding all products", message.error);
  }
});
app.listen(5000, () => {
  connectDB();
  console.log("server started at https://localhost:5000");
});
