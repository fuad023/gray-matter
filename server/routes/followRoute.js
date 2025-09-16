import express from "express";
import requireAuth from "../middleware/authMiddleware.js";

import { followUser, unfollowUser } from "../controllers/followController.js";

const router = express.Router();

// require auth for all follow routes
router.use(requireAuth);

// POST follow a user
router.post("/:recipient", followUser);

// DELETE unfollow a user
router.delete("/:recipient", unfollowUser);

export default router;
