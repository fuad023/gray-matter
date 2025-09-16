import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { followUser, acceptRequest, rejectRequest, cancelRequest, unfollowUser } from "../controllers/followController.js";

const router = express.Router();

// require auth for all follow routes
router.use(requireAuth);

// POST follow a user
router.post("/:recipient", followUser);

// PATCH accept a request
router.patch("/accept/:requester", acceptRequest);

// PATCH reject a request
router.patch("/reject/:requester", rejectRequest)

// PATCH cancel a request
router.patch("/cancel/:requester", cancelRequest)

// DELETE unfollow a user
router.patch("/:requester", unfollowUser)
