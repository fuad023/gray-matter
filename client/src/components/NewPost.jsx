function NewPost() {
  return (
    <div
      className="d-flex border mx-auto mb-4 rounded align-items-center"
      style={{ width: "600px", height: "100px" }}
    >
        <div className="d-flex mx-5 gap-3">
            <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="rounded-circle"
                width="45"
                height="45"
            />
            <button className="border text-start" style={{borderRadius: '20px', width:"400px"}}>
                Share your ideas...
            </button>
        </div>  
        
    </div>
  );
}

export default NewPost;
