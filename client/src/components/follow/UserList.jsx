import { format, set } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";


function UserList({ user }) {
    const [isFollowing, setIsFollowing] = useState("");

    useEffect(() => {
        const fetchFollowing = async () => {
          const currentUser = JSON.parse(localStorage.getItem('user'));
          const response = await fetch(`http://localhost:4000/api/follow/is-pending/${user._id}`, {
            headers: {
              Authorization: currentUser ? `Bearer ${currentUser.token}` : '',
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            console.log("Fetch")
            console.log(data);
            setIsFollowing(data.outgoing);
          }
        };
    
        fetchFollowing();
      }, []);

    const handleFollow = async () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
      const res = await fetch(`http://localhost:4000/api/follow/${user._id}`, {
        method: "POST",
        headers: {
           Authorization: currentUser ? `Bearer ${currentUser.token}` : "",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      setIsFollowing(true);
    } catch (err) {
      console.error("Failed to send follow request:", err);
    }
  };

  return (
    <>
      <div className="border d-flex gap-3 p-3 mb-4 align-items-center rounded">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-circle"
          width="80"
          height="80"
        />
        <div>
          <div className="fs-4 fw-semibold">
            {user.name + " " + user.surname}
          </div>
          <div className="d-flex gap-2">
            <div className="fs-6">{"@" + user.username + " ."}</div>
            <div>{"Followers " + user.follower_count}</div>
          </div>
        </div>
        <div className="ms-auto justify-content-center align-items-center border rounded">
          <button
            className="border border-0 rounded"
            style={{ height: "40px", width: "100px" }}
            onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
