import express from "express";
import requireAuth from "../middleware/requireAuth.js";

import {
    getLikes,
    likePost,
    unlikePost
} from "../controllers/likeControllers.js";

const router = express.Router();

// require auth for all like routes
router.use(requireAuth);

// GET all likes for a post
router.get("/:post_id", getLikes);

// POST like a post
router.patch("/:post_id", likePost);

// DELETE unlike a post
router.delete("/:post_id", unlikePost);

export default router;