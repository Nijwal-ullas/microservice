
import type { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../model/productModel.js";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, category, sellerId } = req.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof category !== "string" || !category.trim() ||
      typeof sellerId !== "string" || !sellerId.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) || price < 0
    ) {
      return res.status(400).json({
        message: "Valid title, price, category and sellerId are required",
      });
    }

    const product = await Product.create({
      title: title.trim(),
      price,
      category: category.trim(),
      sellerId: sellerId.trim(),
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch {
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch {
    return res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Failed to delete product" });
  }
};
