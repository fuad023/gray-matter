import "bootstrap-icons/font/bootstrap-icons.css";
import { format, set } from "date-fns";
import { use, useState } from "react";
import { useEffect } from "react";
import Comment from "./Comment";

function Post({ post, deletePost }) {
  const currentUser = "68c8749c9d5f8fb050cd5f1f";
  const user = JSON.parse(localStorage.getItem("user"));
  const [showFull, setShowFull] = useState(false);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.likes?.includes(currentUser));
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const submitComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/comments/${post._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: user ? `Bearer ${user.token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );
      const data = await res.json();
      setComments([...comments, data.newComment]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c._id !== commentId));
  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const CAPTION_LIMIT = 120;
  const remove = (postId) => {
    deletePost(postId);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleLike = async () => {
    try {
      setLiking(true);
      const res = await fetch(`http://localhost:4000/api/likes/${post._id}`, {
        method: "PATCH",
        headers: {
          Authorization: user ? `Bearer ${user.token}` : "",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLikes(data.likes.length);
      toggleLike();
      setLiking(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnLike = async () => {
    try {
      setLiking(true);
      const res = await fetch(`http://localhost:4000/api/likes/${post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: user ? `Bearer ${user.token}` : "",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLikes(data.likes.length);
      toggleLike();
      setLiking(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/comments/${post._id}`,
          {
            headers: {
              Authorization: user ? `Bearer ${user.token}` : "",
            },
          }
        );
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className=" mx-auto rounded mb-3" style={{ width: "600px" }}>
      <div className="border rounded">
        <div className="d-flex gap-3 align-items-center justify-content-center m-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-circle"
            width="45"
            height="45"
          />
          <div>
            <div className="fw-bold">
              {post.author_id.name + " " + post.author_id.surname}
            </div>
            <div style={{ fontSize: "15px" }}>
              {post.createdAt ? format(new Date(post.createdAt), "PP p") : ""}
            </div>
            <div className="fw-bold">{post.title}</div>
          </div>
          <div className="ms-auto">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle bg-transparent border border-0"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-ui-radios-grid text-dark"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => remove(post._id)}
                  >
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="m-2">
          {post.content && post.content.length > CAPTION_LIMIT && !showFull ? (
            <>
              {post.content.slice(0, CAPTION_LIMIT)}...
              <button
                className="btn btn-link p-0 ms-1 border border-0 bg-transparent"
                style={{ fontSize: "1em" }}
                onClick={() => setShowFull(true)}
              >
                see more
              </button>
            </>
          ) : (
            post.content
          )}
          {post.content && post.content.length > CAPTION_LIMIT && showFull && (
            <button
              className="btn btn-link p-0 ms-1 border border-0 bg-transparent"
              style={{ fontSize: "1em" }}
              onClick={() => setShowFull(false)}
            >
              see less
            </button>
          )}
        </div>
        {post.hasImage && (
          <div style={{ width: "600px" }}>
            <img
              className="border p-1"
              src={post.image}
              alt=""
              width={"600px"}
            />
          </div>
        )}
        <hr />
        <div className="d-flex align-items-center justify-content-center gap-5 m-2 border-bottom pb-2">
          <button
            className="d-flex mx-6 rounded border gap-3"
            onClick={liked ? handleUnLike : handleLike}
            disabled={liking}
          >
            <i
              className={
                liked
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up me-2"
              }
            ></i>
            <span>Like</span>
            <span>{likes}</span>
          </button>
          <button
            className="d-flex mx-5 rounded border gap-1"
            onClick={handleComment}
          >
            <i className="bi bi-chat me-2"></i>
            <span>Comment</span>
            <span>{comments.length}</span>
          </button>
          <button className="mx-6 rounded border">
            <i className="bi bi-sign-turn-slight-right me-2"></i>
            <span>Share</span>
          </button>
        </div>
        {isCommenting && (
          <div className="m-2 mb-3">
            <div>All Comments:</div>
            <div>
              <div>
                {comments.map((comment, index) => (
                  <Comment
                    key={comment._id || index}
                    comment={comment}
                    postId={post._id}
                    userId={user._id}
                    userToken={user.token}
                    onDelete={handleDeleteComment}
                  />
                ))}
              </div>
              <div className="d-flex gap-3 align-items-center m-2">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="rounded-circle"
                  width="45"
                  height="45"
                />
                <input
                  style={{ width: "350px", height: "40px" }}
                  type="text"
                  placeholder="Write a comment here"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="border border-circle border-1"
                  onClick={submitComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
