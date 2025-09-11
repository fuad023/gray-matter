import React, { useState } from "react";

function CreatePost({ setIsVisible, addPost }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userCaption, setUserCaption] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const toggleVigibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handlePost = (post) => {
    addPost(post);
    toggleVigibility();
  };

  const isValid = userCaption.trim().length > 0;

  return (
    <div
      className="d-column mx-auto border mb-4"
      style={{
        width: "600px",
        height: "auto",
        minHeight: "200px",
        maxHeight: "700px",
      }}
    >
      <div
        className="d-flex align-items-center gap-3 m-2"
        style={{ height: "auto" }}
      >
        <span>Add a caption</span>
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "400px", height: "auto" }}
          placeholder="Description"
          required = 'true'
          onChange={(e) => setUserCaption(e.target.value)}
        />
      </div>
      <hr />
      <div className="d-column">
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload an image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {selectedImage && (
          <div className="d-flex justify-content-center rounded m-2">
            <img
              src={selectedImage}
              alt="Preview"
              className="img-fluid rounded justify-content-center align-items-center"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center m-3 gap-4 bg-dark p-3 rounded">
        <button
          className="border rounded"
          disabled = {!isValid}
          onClick={() =>
            handlePost({
              id: Date.now().toString(),
              userName: "Sajid AL Amin",
              hasImage: selectedImage,
              image: selectedImage,
              caption: userCaption,
              timeStamp: "2h ago",
            })
          }
        >
          Post
        </button>
        <button className="border rounded" onClick={toggleVigibility}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
