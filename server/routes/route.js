import express from "express";
import { getUser, postUser } from "../controllers/UserController.js";

const router = express.Router();

//router.get("/",);

router.get("/", getUser);
router.post("/", postUser);

export default router;
