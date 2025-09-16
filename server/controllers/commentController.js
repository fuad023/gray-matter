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
  await post.populate("comments.author_id", "name surname");
  const newComment = post.comments[post.comments.length - 1]

  res.status(200).json({newComment });
};

// delete a comment from a post
export const deleteComment = async (req, res) => {
  const { post_id, comment_id } = req.params;
  const user_id = req.user._id;

  // validate IDs
  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: "No such post" });
  }
  if (!mongoose.Types.ObjectId.isValid(comment_id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  // find the post
  const post = await Post.findById(post_id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  // find the comment
  const comment = post.comments.id(comment_id);
  if (!comment) {
    return res.status(404).json({ error: "No such comment" });
  }

  // check ownership
  if (comment.author_id.toString() !== user_id.toString()) {
    return res.status(403).json({ error: "Not authorized to delete this comment" });
  }

  // remove comment
  post.comments.pull(comment_id);
  await post.save();

  res.status(200).json({ message: "Comment deleted!", post });
};
