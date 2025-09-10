import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from 'express';
import { connectDb } from "./db/connectDb.js";

export async function startServer() {
    const app = express();

    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // database
    await connectDb();

    // server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}
