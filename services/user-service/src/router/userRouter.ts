import { Router } from "express";
import { register, login, getUserById,getUsersByIds } from "../controller/userController.js";
import { serviceAuthMiddleware } from "../middleware/serviceMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/internal/:id", serviceAuthMiddleware, getUserById);
router.post("/internal/batch", serviceAuthMiddleware, getUsersByIds);

export default router;
