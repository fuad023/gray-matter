import { useEffect, useState } from "react";
import FollwoSidebarList from "./FollowSidebarList";

function FollowSidebarList() {
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
      <div>
        {isLoading ? (
            <div>Loading...</div>
          ) : (
            users.following
              .filter((u) => u._id !== currentUser._id)
              .map((user, index) => (
                <FollwoSidebarList key={user._id || index} user={user} />
              ))
          )}
      </div>
    </>
  );
}

export default FollowSidebarList;
