import mongoose from "mongoose";
import User from "../models/userModel.js";

// get all users
export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("name surname username email");
  res.status(200).json(users);
}
