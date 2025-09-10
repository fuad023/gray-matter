import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./db/Connect.js";
import userRoutes from "./routes/Route.js";

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
