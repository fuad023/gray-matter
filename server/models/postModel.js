import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [ { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, { timestamps: true } ],
    comments: [
      {
        author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true },
        required: true
      }, { timestamps: true }
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;
