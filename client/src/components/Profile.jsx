// import { useState, useEffect } from "react";
import Banner from "../assets/banner.jpg";
import ProfilePic from "../assets/profile.png";
import ProfilePic2 from "../assets/profile2.jpg";
import Banner2 from "../assets/banner2.png";
import { Link } from "react-router-dom";

function Profile() {
  //     const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const user = JSON.parse(localStorage.getItem('user'));
  //       try {
  //         const res = await fetch("http://localhost:4000/api/user", {
  //           headers: {
  //             Authorization: user ? `Bearer ${user.token}` : " ",
  //             "Content-Type": "application/json",
  //           }
  //         });
  //         const data = await res.json();
  //         console.log(data);
  //         setUser(data);
  //       } catch (err) {
  //         console.error("Failed to fetch user:", err);
  //       }
  //     };

  //     fetchUser();
  //   }, []);
  return (
    <>
      <div style={{ height: "70px" }}>This is profile</div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div
          className=" border border-bottom-0 position-relative p-1"
          style={{ width: "810px", minHeight: "350px", maxHeight: "400px" }}
        >
          <img
            src={Banner}
            alt="banner"
            style={{ width: "800px", maxHeight: "400px" }}
          />
          <div
            className="border rounded-circle position-absolute"
            style={{
              width: "200px",
              height: "200px",
              bottom: "10px",
              left: "10px",
            }}
          >
            <img
              className="rounded-circle border border-2"
              src={ProfilePic2}
              style={{ width: "200px", height: "200px" }}
              alt="profile"
            />
          </div>
        </div>
        <div className="border border-top-0 p-1 pt-2 d-flex align-items-center">
          <div className="d-flex flex-column ps-3" style={{ width: "800px" }}>
            <h3 className="fs-2">Sajid Al Amin</h3>
            <p className="fs-5">
              Student at Ahsanullah University of Science & Technology
            </p>
            <p className="fs-6">Rampura, Dhaka, Bangladesh</p>
          </div>
        </div>
        <div className="border border-top-0 p-1" style={{ width: "810px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="#">
                Active
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Link
              </Link>
            </li>
          </ul>
          <div style={{height: '300px', width: '810px'}}></div>
        </div>
      </div>
    </>
  );
}

export default Profile;
