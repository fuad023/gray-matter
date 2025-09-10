import React from "react";
import Post from './Post'
import LinkedExample from "./Sidebar_list";
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'
import NewPost from "./NewPost";

const Home = () => {

  let postMaterial = [
    {
      id: '1',
      userName: "Sajid AL Amin",
      hasImage: true,
      image: post1,
      caption: "This is my fitst post",
      timeStamp: "2h ago",
    },
    {
      id: '2',
      userName: "Nafis Fuad",
      hasImage: true,
      image: post2,
      caption: "Messi X Shakib",
      timeStamp: "5h ago",
    },
    {
      id: '3',
      userName: "Rashedul Hasan",
      hasImage: false,
      image: null,
      caption: "I have rendered a new bike model ;)",
      timeStamp: "1d ago",
    }
  ]

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
          <NewPost/>
          {postMaterial.map((postInfo) => (
            <Post key={postInfo.id} post = {postInfo}/>
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
