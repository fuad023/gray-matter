import mongoose from "mongoose";
import Post from "../models/postModel.js";

// get all likes for a post
export const getLikes = async (req, res) => {
  const { post_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(post_id).populate("likes", "name surname");
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post.likes);
};

// like a post
export const likePost = async (req, res) => {
  const { post_id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(post_id);
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

// unlike a post
export const unlikePost = async (req, res) => {
  const { post_id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  if (!post.likes.includes(user_id)) {
    return res.status(400).json({ error: "Post not liked yet" });
  }

  post.likes = post.likes.filter(
    (id) => id.toString() !== user_id.toString()
  );

  await post.save();
  res.status(200).json(post);
};
