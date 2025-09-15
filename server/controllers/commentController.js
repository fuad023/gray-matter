import mongoose from "mongoose";
import Post from "../models/postModel.js";

// get all comments for a post
export const getComments = async (req, res) => {
  const { post_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(post_id).populate("comments.author_id", "name surname");
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post.comments);
};

// add a comment to a post
export const addComment = async (req, res) => {
  const { post_id } = req.params;
  const user_id = req.user._id;
  const { comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }
  if (!comment) {
    return res.status(400).json({ error: "Comment cannot be empty" });
  }

  post.comments.push({ author_id: user_id, comment });
  await post.save();

  res.status(200).json(post);
};

// delete a comment from a post
export const deleteComment = async (req, res) => {
  const { post_id, comment_id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }
  if (!mongoose.Types.ObjectId.isValid(comment_id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  const comment = post.comments.id(comment_id);
  if (!comment) {
    return res.status(404).json({ error: "No such comment" });
  }

  if (comment.author_id.toString() !== user_id.toString()) {
    return res.status(403).json({ error: "Not authorized to delete this comment" });
  }

  comment.remove();
  await post.save();

  res.status(200).json(post);
};
