import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Button from "react-bootstrap/esm/Button";
import { useLogout} from "./hooks/useLogout";
import { useState, useEffect } from "react";
import Profile from "./Profile";


const Navbar = () => {
   //const savedProfile = localStorage.getItem("profilePicSrc");
  const [profilePic, setProfilePic] = useState([]);
 
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useLogout()
  const navigate = useNavigate()
  const handleClick = async () => {
    await logout()
    navigate('/login')
  }

  useEffect(() => {
      const savedProfile = localStorage.getItem("profilePicSrc");
      if (savedProfile) setProfilePic(savedProfile);
      
    }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Sidebar/>
        <a className="navbar-brand ms-4" href="#">
          <span className="fw-bold fs-3">GrayMatter</span>
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Follow
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/suggest">
                    Suggestion
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/followrequests">
                    Follwer
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <Link className="dropdown-item" to="/follower">
                    Follow Request
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/following">
                    Following
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="me-auto">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="dropdown bord">
            <button
              className="btn btn-transparent"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div>
                <span className="me-2">{user?.email}</span>
                <img
                  src={profilePic || "https://i.pravatar.cc/40"}
                  alt="user profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
              </div>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-light rounded border border-2"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link className="dropdown-item" to="/profilepage">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/manageprofile">
                  Manage Account
                </Link>
              </li>
              <li>
                <Button className="dropdown-item" onClick={handleClick}>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
