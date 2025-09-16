function Comment({ comment }) {
  return (
    <div className="border border-1 m-2 p-2 rounded">
      <div className="d-flex gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-circle"
          width="45"
          height="45"
        />
        <div>
          <div className="fw-bold">
            {comment?.author_id?.name + " " + comment?.author_id?.surname}
          </div>
          <div>
            {comment?.comment}
          </div>
        </div>
        <div className="ms-auto">
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
    </div>
  );
}
export default Comment;
