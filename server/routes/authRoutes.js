import express from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", protect, adminOnly, registerUser);

export default router;