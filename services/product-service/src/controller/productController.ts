import type { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../model/productModel.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { getUsersByIds } from "../services/userService.js";

interface Seller {
  id: string;
  name: string;
}


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    const sellerIds = [
      ...new Set(products.map((product) => product.sellerId.toString())),
    ];

    let sellers : Seller[] = [];

    try {
      sellers = await getUsersByIds(sellerIds);
    } catch (error) {
      console.error("User Service unavailable:", error);
    }

    const result = products.map((product) => {
      const seller = sellers.find(
        (seller) => seller.id === product.sellerId.toString(),
      );

      return {
        ...product.toObject(),
        seller: seller || null,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { title, price, category } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message: "Valid title, price and category are required",
      });
    }

    const sellerId = req.user?.id;

    if (!sellerId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const product = await Product.create({
      title: title.trim(),
      price,
      category: category.trim(),
      sellerId,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({
      message: "Failed to create product",
    });
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

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const sellerId = req.user?.id;

    if (!sellerId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      sellerId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not the owner",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).json({
      message: "Failed to delete product",
    });
  }
};
