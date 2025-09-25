import express from "express";
import { co2 } from "@tgwf/co2";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import followRoutes from "./routes/followRoute.js";
import postRoutes from "./routes/postRoute.js";
import likeRoutes from "./routes/likeRoute.js";
import commentRoutes from "./routes/commentRoute.js";

dotenv.config();
const co2Emission = new co2({ model: "swd" });
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  // middleware to calculate data transfer size
  let reqBytes = 0;
  let resBytes = 0;

  // calculate request size
  if (req.body) {
    reqBytes += Buffer.byteLength(JSON.stringify(req.body), "utf-8");
  }
  if (req.query) {
    reqBytes += Buffer.byteLength(JSON.stringify(req.query), "utf-8");
  }
  if (req.headers) {
    reqBytes += Buffer.byteLength(JSON.stringify(req.headers), "utf-8");
  }
  
  // override res.write to calculate response size
  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk) {
    if (chunk) {
      resBytes += Buffer.byteLength(chunk, "utf-8");
    }
    originalWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      resBytes += Buffer.byteLength(chunk, "utf-8");
    }
    
    // store total bytes
    res.locals.totalBytes = reqBytes + resBytes;

    // calculate carbon emissions
    const greenHost = false; // set to true if server is hosted on a green host
    const emissions = co2Emission.perByte(res.locals.totalBytes, greenHost);

    console.log("Data transferred: ", res.locals.totalBytes, " bytes");
    console.log("Estimated CO2 emissions: ", emissions.toFixed(3), " grams");
    originalEnd.apply(res, arguments);
  };

  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
