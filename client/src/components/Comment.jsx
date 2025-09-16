function Comment({ comment, postId, userId, userToken, onDelete }) {

  const isMyComment = comment?.author_id?._id === userId;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/comments/${postId}/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        return;
      }

      onDelete(comment._id);
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

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
        {isMyComment && <div className="ms-auto">
          <button className="bi bi-trash border bg-transparent" onClick={handleDelete}></button>
        </div>}
      </div>
    </div>
  );
}
export default Comment;
