import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { getUsers, getUsersExceptFollowing, getUser, getUserByUsername, updateUser } from "../controllers/userController.js";

const router = express.Router();

// require auth for all user routes
router.use(requireAuth);

// GET all users
router.get("/", getUsers);

// GET users except whom current user follows
router.get("/except-following", getUsersExceptFollowing);

// GET a user by ID
router.get("/id/:id", getUser);

// GET a user by username
router.get("/username/:username", getUserByUsername);

export default router;
