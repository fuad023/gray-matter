import "bootstrap-icons/font/bootstrap-icons.css";

function Post({post, deletePost}) {

  const remove = (post) => {
    deletePost(post);
  }

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
            <div className="fw-bold">{post.tittle}</div>
            {/* <div style={{ fontSize: "15px" }}>{post.timeStamp}</div> */}
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
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  {/* <button className="dropdown-item" onClick={() => {remove(post.id)}}>
                    Delete Post
                  </button> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="m-2">{post.content}</div>
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
