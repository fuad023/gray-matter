import express from "express";
import { getStudents, newStudent } from "../controllers/studentController";

const router = express.Router();

router.get('/', getStudents);
router.post('/', newStudent);

export default router;