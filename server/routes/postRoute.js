import express from "express";
import requireAuth from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// require auth for all post routes
router.use(requireAuth);

// GET all posts
router.get("/", getPosts);

//GET a single post
router.get("/:id", getPost);

// POST a new post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

// UPDATE a post
router.patch("/:id", updatePost);

export default router;
