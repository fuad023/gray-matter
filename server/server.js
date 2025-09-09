import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connctDb from "./db/connect.js";
import router from "./routes/routes.js";

dotenv.config();
connctDb();

const app = express();
app.use(cors());

app.use(express.json);

app.use('api/student', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));