
import "bootstrap-icons/font/bootstrap-icons.css";
import { format } from 'date-fns';
import { useState } from 'react';


function Post({ post, deletePost }) {
  const [showFull, setShowFull] = useState(false);
  const CAPTION_LIMIT = 120;
  const remove = (postId) => {
    deletePost(postId);
  };
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
              <button className="btn btn-link p-0 ms-1 border border-0 bg-transparent" style={{fontSize: '1em'}} onClick={() => setShowFull(true)}>see more</button>
            </>
          ) : post.content}
          {post.content && post.content.length > CAPTION_LIMIT && showFull && (
            <button className="btn btn-link p-0 ms-1 border border-0 bg-transparent" style={{fontSize: '1em'}} onClick={() => setShowFull(false)}>see less</button>
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
        <div className="d-flex align-items-center justify-content-center gap-5 m-2">
          <button className="mx-6 rounded border">
            <i className="bi bi-hand-thumbs-up me-2"></i>
            <span>Like</span>
          </button>
          <button className="mx-5 rounded border">
            <i className="bi bi-chat me-2"></i>
            <span>Comment</span>
          </button>
          <button className="mx-6 rounded border">
            <i className="bi bi-sign-turn-slight-right me-2"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
