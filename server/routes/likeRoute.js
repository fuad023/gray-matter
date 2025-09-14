import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";

import {
    getLikes,
    likePost,
    unlikePost
} from "../controllers/likeControllers.js";
const router = Router();

// require auth for all like routes
router.use(requireAuth);

// GET all likes for a post
router.get("/:postId", getLikes);

// POST like a post
router.post("/:postId", likePost);

// DELETE unlike a post
router.delete("/:postId/:userId", unlikePost);

export default router;