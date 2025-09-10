import React from "react";
import Post from './Post'
import LinkedExample from "./Sidebar_list";
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'

const Home = () => {
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
          <Post image = {post1} isImage = "true"/>
          <Post image = {post2} isImage = "true"/>
          <Post image = "" isImage = "false"/>
        </div>
        <div className="d-none d-md-block border ms-4" style={{width: '200px'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis veritatis recusandae sunt nesciunt quidem adipisci repellendus facere nam amet voluptatem? Eos delectus animi dignissimos officiis rem possimus mollitia quod accusamus.
        </div>
      </div>
    </>
  );
};

export default Home;
