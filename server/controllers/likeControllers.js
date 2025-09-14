import mongoose from "mongoose";
import Post from "../models/postModel.js";

// get all likes for a post
export const getPostLikes = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(id).populate("likes", "name surname");
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post.likes);
};

// like a post
export const likePost = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  if (post.likes.includes(user_id)) {
    return res.status(400).json({ error: "Post already liked" });
  }
  
  post.likes.push(user_id);
  await post.save();
  res.status(200).json(post);
};
