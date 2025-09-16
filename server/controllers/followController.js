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

// get all followers of the logged-in user
export const getFollowers = async (req, res) => {
  const recipient = req.user._id;

  try {
    const followers = await Follow.find({ recipient, status: "accepted" })
      .populate("requester", "name surname username email");

    res.status(200).json(followers.map(f => f.requester));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users the logged-in user is following
export const getFollowing = async (req, res) => {
  const requester = req.user._id;

  try {
    const following = await Follow.find({ requester, status: "accepted" })
      .populate("recipient", "name surname username email");

    res.status(200).json(following.map(f => f.recipient));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get pending incoming requests (people who want to follow me)
export const getIncomingRequests = async (req, res) => {
  const recipient = req.user._id;

  try {
    const requests = await Follow.find({ recipient, status: "pending" })
      .populate("requester", "name surname username email");

    res.status(200).json(requests.map(r => r.requester));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get pending outgoing requests (people I want to follow)
export const getOutgoingRequests = async (req, res) => {
  const requester = req.user._id;

  try {
    const requests = await Follow.find({ requester, status: "pending" })
      .populate("recipient", "name surname username email");

    res.status(200).json(requests.map(r => r.recipient));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check if current user follows a given user
export const isFollowing = async (req, res) => {
  const requester = req.user._id;          // logged-in user
  const { recipient } = req.params;        // target user id

  if (!mongoose.Types.ObjectId.isValid(recipient)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  try {
    const follow = await Follow.findOne({ requester, recipient, status: "accepted" });

    res.status(200).json({ isFollowing: !!follow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check if given user follows the current user
export const isFollowedBy = async (req, res) => {
  const recipient = req.user._id;         // logged-in user
  const { requester } = req.params;       // other user id

  if (!mongoose.Types.ObjectId.isValid(requester)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  try {
    const follow = await Follow.findOne({ requester, recipient, status: "accepted" });

    res.status(200).json({ isFollowedBy: !!follow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check if there is a pending follow request between current user and given user
export const hasPendingRequest = async (req, res) => {
  const currentUser = req.user._id;
  const { user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(404).json({ error: "Invalid user id!" });
  }

  try {
    const outgoing = await Follow.findOne({ requester: currentUser, recipient: user_id, status: "pending" });
    const incoming = await Follow.findOne({ requester: user_id, recipient: currentUser, status: "pending" });

    res.status(200).json({
      hasPendingRequest: !!(outgoing || incoming),
      outgoing: !!outgoing,   // I sent a request to them
      incoming: !!incoming    // They sent a request to me
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
