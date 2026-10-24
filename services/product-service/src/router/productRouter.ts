
import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
} from "../controller/productController.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

export default router;
