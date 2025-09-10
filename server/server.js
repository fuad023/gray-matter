import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from 'express';
import { connectDb } from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

export async function startServer() {
    const app = express();

    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.get("/", (req, res) => {
        res.send("API is running...");
    });

    app.use("/api/user", userRoutes);

    // db + server
    await connectDb();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}
