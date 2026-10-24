import { Router } from "express";
import {register,login} from "../controller/userController.js";

const router = Router();

router.get("/register",register);
router.get("/login",login);

export default router;
