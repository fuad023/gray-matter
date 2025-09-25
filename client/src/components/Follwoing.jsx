import { useEffect, useState } from "react";
import LinkedExample from "./Sidebar_list";
import FollowingList from "./FollowingList";

function Following() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:4000/api/follow/following", {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : "",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setUsers(data);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <div style={{ height: "70px" }}>This is home</div>
      <div className="d-flex">
        <div
          className="d-none d-lg-block border me-4"
          style={{ width: "200px", minWidth: "200px" }}
        ></div>
        <div
          className="d-none d-lg-block border me-4 position-fixed"
          style={{ width: "200px" }}
        >
          <LinkedExample />
        </div>
        <div className="border flex-grow-1 p-4" style={{ maxWidth: "1000px" }}>
          <div>
            <h2 className="mb-4">Follow requests:</h2>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            users.following
              .map((user, index) => (
                <FollowingList key={user._id || index} user={user} />
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default Following;
