import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: "server error" });
    console.log("error in finding all products", message.error);
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "product not found" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(500).json({ status: false, message: "server error" });

    console.log("error in deleting products", error.message);
  }
};
