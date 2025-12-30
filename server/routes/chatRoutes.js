import { Router } from "express";
import { getChats, createChat } from "../controllers/chatController.js";
import { protect } from "../middleware/clerkAuthMiddleware.js";

const router = Router();

router.get("/", protect, getChats);
router.post("/", protect, createChat);

export default router;
