
import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
} from "../controller/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/", authMiddleware,createProduct);
router.get("/:id", getProductById);
router.delete("/:id",authMiddleware, deleteProduct);

export default router;
