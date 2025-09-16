import mongoose from "mongoose";
import User from "../models/userModel.js";

// get all users
export const getUsers = async (req, res) => {
  const users = await User.aggregate([
    { $sort: { createdAt: -1 } },
    { $project: { _id: 1, name: 1, surname: 1, username: 1, email: 1, follower_count: { $size: "$followers" } } },
    { $sort: { createdAt: -1 } }
  ]);

  res.status(200).json(users);
}

// get users except whom current user follows
export const getUsersExceptFollowing = async (req, res) => {
  const currentUserId = req.user._id;
  const users = await User.aggregate([
    { $match: { _id: { $ne: currentUserId }, followers: { $ne: currentUserId } } }, // exclude current user and users whom current user follows
    { $project: { _id: 1, name: 1, surname: 1, username: 1, email: 1, follower_count: { $size: "$followers" } } },
    { $sort: { createdAt: -1 } }
  ]);

  res.status(200).json(users);
};

// get a user by _id
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID!" });
  }

  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ error: "No such user!" });
  }

  res.status(200).json(user);
};

// get user by username
export const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  
  const user = await User.aggregate([
    { $match: { username } }, // filter like findOne({ username })
    { $project: { name: 1, surname: 1, username: 1, email: 1, follower_count: { $size: "$followers" } } },
    { $limit: 1 } // return only one document
  ]);
  if (!user[0]) {
    return res.status(404).json({ error: "No such user!" });
  }

  res.status(200).json(user[0]);
};

// update a user
export const updateUser = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID!" });
  }
  const { name, surname, email, bio } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!surname) {
    emptyFields.push("surname");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  
  const user = await User.findOneAndUpdate(
    { _id, name, surname, email, bio },
    { new: true }
  ).select("name surname email bio");
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

// update user email
export const updateUserEmail = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please provide an email" });
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Please enter a valid email." });
  }

  const user = await User.findOneAndUpdate(
    _id,
    { email },
    { new: true }
  ).select("name surname email bio");
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }
  res.status(200).json(user);
};
