function Comment({ comment }) {
  return (
    <div className="d-flex gap-3 align-items-center m-2">      
        {comment.comment}
        <div>
          {comment.author_id?.name + " " + comment.author_id?.surname}
        </div>      
    </div>
  );
}
export default Comment;