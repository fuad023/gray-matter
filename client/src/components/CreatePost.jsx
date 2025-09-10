import React, { useState } from 'react';

function CreatePost({ setIsVisible, addPost }) {
    
    const [selectedImage, setSelectedImage] = useState(null);

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
  }

  return (
    <div
      className="d-column mx-auto border mb-4"
      style={{ width: "600px", height: "600px" }}
    >
      <div
        className="d-flex align-items-center gap-3 m-2"
        style={{ height: "auto" }}
      >
        <span>Add a caption</span>
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "200px", height: "auto" }}
        />
        <button>Add</button>
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
          <div>
            <img
              src={selectedImage}
              alt="Preview"
              className="img-fluid rounded"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
      </div>
      <div className="d-flex gap-4">
        <button
            onClick={() => handlePost({
                id: Date.now().toString(),
                userName: "Sajid AL Amin",
                hasImage: true,
                image: selectedImage,
                caption: "This is my fitst post",
                timeStamp: "2h ago",
            })}
        >Post</button>
        <button onClick={toggleVigibility}>Cancel</button>
      </div>
    </div>
  );
}

export default CreatePost;
