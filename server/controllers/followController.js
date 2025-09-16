import mongoose from "mongoose";
import Follow from "../models/followModel.js";

// follow a user
export const followUser = async (req, res) => {
  const requester = req.user._id;
  const { recipient } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  if (requester === recipient) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }

  // check if already following
  const alreadyFollowing = await Follow.findOne({ requester, recipient });
  if (alreadyFollowing) {
    return res.status(400).json({ error: "You are already following this user" });
  }

  // create follow
  try {
    const follow = await Follow.create({ requester, recipient });
    res.status(200).json(follow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// accept a request
export const acceptRequest = async (req, res) => {
  const recipient = req.user._id;
  const { requester } = req.params;
  if (!mongoose.Types.ObjectId.isValid(requester)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  const follow = await Follow.findOneAndUpdate(
    { requester, recipient, status: "pending" },
    { status: "accepted" },
    { new: true }
  );

  if (!follow) {
    return res.status(400).json({ error: "No pending follow request from this user" });
  }

  res.status(200).json(follow);
};

// reject a request
export const rejectRequest = async (req, res) => {
  const recipient = req.user._id;
  const { requester } = req.params;
  if (!mongoose.Types.ObjectId.isValid(requester)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }
  
  const follow = await Follow.findOneAndUpdate(
    { requester, recipient, status: "pending" },
    { status: "rejected" },
    { new: true }
  );
  
  if (!follow) {
    return res.status(400).json({ error: "No pending follow request from this user" });
  }
  
  res.status(200).json(follow);
};

// cancel a request
export const cancelRequest = async (req, res) => {
  const requester = req.user._id;
  const { recipient } = req.params;
  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  const follow = await Follow.findOneAndDelete({ requester, recipient, status: "pending" });
  if (!follow) {
    return res.status(400).json({ error: "No pending follow request to this user" });
  }

  res.status(200).json(follow);
};

// unfollow a user
export const unfollowUser = async (req, res) => {
  const requester = req.user._id;
  const { recipient } = req.params;
  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  const follow = await Follow.findOneAndDelete({ requester, recipient });
  if (!follow) {
    return res.status(400).json({ error: "You are not following this user" });
  }

  res.status(200).json(follow);
};
