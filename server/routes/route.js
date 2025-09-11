import express from "express";
import { signupUser, loginUser } from "../controllers/UserController";
// import { getUser, postUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

// router.get("/", getUser);
// router.post("/", postUser);

export default router;
