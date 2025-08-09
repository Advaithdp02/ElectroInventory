import express from "express";
import { 
  getItems, 
  createItem, 
  updateItem, 
  deleteItem,
  getTypes 
} from "../controllers/itemControllers.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (requires login)
router.get("/", protect, getItems);
router.get("/types", getTypes);

// Admin only
router.post("/", protect, adminOnly, createItem);
router.put("/:id", protect, adminOnly, updateItem);
router.delete("/:id", protect, adminOnly, deleteItem);

export default router;
