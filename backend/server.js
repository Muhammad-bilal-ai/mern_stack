import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();

app.use(express.json()); // allow the app to use json data in req.body
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
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server started at https://localhost:5000");
});
