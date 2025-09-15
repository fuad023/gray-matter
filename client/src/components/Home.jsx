import React from "react";
import Post from './Post'
import LinkedExample from "./Sidebar_list";
import NewPost from "./NewPost";
import CreatePost from './CreatePost'
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch("http://localhost:4000/api/post", {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : '',
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

const deletePost = async (postId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`http://localhost:4000/api/post/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: user ? `Bearer ${user.token}` : '',
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    setPosts(posts => posts.filter(post => post._id !== postId));
  }
};

const addPost = (post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  return (
    <>
      <div style={{ height: "70px" }}>This is home</div>
      <div className="d-flex">
        <div className="d-none d-lg-block border me-4" style={{width: '200px', minWidth:'200px'}}>
        </div>
        <div className="d-none d-lg-block border me-4 position-fixed" style={{width: '200px'}}>
          <LinkedExample/>
        </div>
        <div className="flex-grow-1">
          {!isVisible && <NewPost setIsVisible={setIsVisible}/>}
          {isVisible && <CreatePost setIsVisible={setIsVisible} addPost = {addPost}/> }
          {posts.map((postInfo) => (
            <Post key={postInfo._id || postInfo.id} post={postInfo} deletePost={deletePost} />
          ))}
        </div>
        <div className="d-none d-md-block border ms-4" style={{width: '200px'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis veritatis recusandae sunt nesciunt quidem adipisci repellendus facere nam amet voluptatem? Eos delectus animi dignissimos officiis rem possimus mollitia quod accusamus.
        </div>
      </div>
    </>
  );
};

export default Home;
