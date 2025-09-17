import { useState, useEffect, use } from "react";


import Banner1 from "../assets/banner.jpg";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";


import Profile1 from "../assets/profile1.png";
import Profile2 from "../assets/profile2.png";
import Profile3 from "../assets/profile3.png";

function Profile() {
  const [activeTab, setActiveTab] = useState("about");


  const [profilePic, setProfilePic] = useState(Profile1);
  const [bannerPic, setBannerPic] = useState(Banner1);


  const [openProfile, setOpenProfile] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);

  const profileOptions = [
    { src: Profile1, label: "Profile 1" },
    { src: Profile2, label: "Profile 2" },
    { src: Profile3, label: "Profile 3" },
  ];

  const bannerOptions = [
    { src: Banner1, label: "Banner 1" },
    { src: Banner2, label: "Banner 2" },
    { src: Banner3, label: "Banner 3" },
  ];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const savedProfile = localStorage.getItem("profilePicSrc");
    const savedBanner = localStorage.getItem("bannerPicSrc");
    if (savedProfile) setProfilePic(savedProfile);
    if (savedBanner) setBannerPic(savedBanner);
    const fetchUsers = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:4000/api/users/id/${user._id}`, {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : '',
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

 
  const handleProfileSelect = (src) => {
    setProfilePic(src);
    localStorage.setItem("profilePicSrc", src);
    setOpenProfile(false);
  };

  const handleBannerSelect = (src) => {
    setBannerPic(src);
    localStorage.setItem("bannerPicSrc", src);
    setOpenBanner(false);
  };

  const about = {
    username: users.username,
    contactNumber: "+880 1XXX-XXXXXX",
    email: users.email,
    address: users.address,
    followers: users.followers?.length || 0,
    following: users.following?.length || 0,
    posts: 15,
  };

  return (
    <>
      <div style={{ height: "70px" }}>This is profile</div>

      <div className="d-flex flex-column align-items-center justify-content-center">

        <div
          className="border border-bottom-0 position-relative p-1"
          style={{ width: "810px", minHeight: "350px", maxHeight: "400px" }}
        >
          <img
            src={bannerPic}
            alt="banner"
            style={{ width: "800px", maxHeight: "400px", objectFit: "cover" }}
          />


          <div className="position-absolute top-0 end-0 m-2">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                onClick={() => setOpenBanner((v) => !v)}
                aria-expanded={openBanner ? "true" : "false"}
              >
                Change Banner
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  openBanner ? "show" : ""
                }`}
                style={{ minWidth: 200 }}
              >
                {bannerOptions.map((opt, i) => (
                  <li key={i}>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleBannerSelect(opt.src)}
                    >
                      <img
                        src={opt.src}
                        alt={opt.label}
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <span>{opt.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div
            className="border rounded-circle position-absolute bg-light"
            style={{ width: "200px", height: "200px", bottom: "10px", left: "10px" }}
          >
            <img
              className="rounded-circle border border-2"
              src={profilePic}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              alt="profile"
            />
          </div>
        </div>


        <div
          className="border border-top-0 p-2 d-flex align-items-center justify-content-between"
          style={{ width: "810px" }}
        >
          <div className="d-flex flex-column ps-3">
            <h3 className="fs-2 mb-1">{users.name + " " + users.surname}</h3>
            <p className="fs-5 mb-1">
              {users.education}
            </p>
            <p className="fs-6 mb-0">{users.address}</p>
          </div>


          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              onClick={() => setOpenProfile((v) => !v)}
              aria-expanded={openProfile ? "true" : "false"}
            >
              Select Photo
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                openProfile ? "show" : ""
              }`}
              style={{ minWidth: 200 }}
            >
              {profileOptions.map((opt, i) => (
                <li key={i}>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => handleProfileSelect(opt.src)}
                  >
                    <img
                      src={opt.src}
                      alt={opt.label}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span>{opt.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-top-0 p-1" style={{ width: "810px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
                type="button"
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "posts" ? "active" : ""}`}
                onClick={() => setActiveTab("posts")}
                type="button"
              >
                Posts
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "media" ? "active" : ""}`}
                onClick={() => setActiveTab("media")}
                type="button"
              >
                Media
              </button>
            </li>
          </ul>

          
          <div style={{ minHeight: "300px", width: "810px" }} className="p-3">
            {activeTab === "about" && (
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="mb-2">Contact</h5>
                    <div className="mb-1">
                      <i className="bi bi-person-circle me-2 text-secondary"></i>
                      <strong>Username:</strong> <span>{users.name + " " + users.surname}</span>
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-telephone-fill me-2 text-primary"></i>
                      <strong>Phone:</strong> <span>{about.contactNumber}</span>
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-envelope-fill me-2 text-danger"></i>
                      <strong>Email:</strong> <span>{about.email}</span>
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-geo-alt-fill me-2 text-success"></i>
                      <strong>Address:</strong> <span>{about.address}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="border rounded p-3">
                    <h5 className="mb-2">Social</h5>
                    <div className="mb-1">
                      <i className="bi bi-people-fill me-2 text-success"></i>
                      <strong>Followers:</strong> <span>{about.followers}</span>
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-person-check-fill me-2 text-info"></i>
                      <strong>Following:</strong> <span>{about.following}</span>
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-journal-text me-2 text-warning"></i>
                      <strong>Total Posts:</strong> <span>{about.posts}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "posts" && <div className="text-muted">No posts yet.</div>}
            {activeTab === "media" && <div className="text-muted">No media uploaded yet.</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
