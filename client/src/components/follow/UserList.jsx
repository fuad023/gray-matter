import { useState, useEffect } from "react";

function UserList({ user }) {
  const [sentRequest, setSentRequest] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
  const [isFollowAccepted, setIsFollowAccepted] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `http://localhost:4000/api/follow/is-pending/${user._id}`,
        {
          headers: {
            Authorization: currentUser ? `Bearer ${currentUser.token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.isFollowing) {
          setIsFollowAccepted(true);
        } else if (data.hasPendingRequest) {
          if (data.outgoing) {
            setSentRequest(true);
          } else {
            setReceivedRequest(true);
          }
        }
      }
    };

    fetchFollowing();
  }, [user._id]);

  const handleFollow = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
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

      setSentRequest(true);
    } catch (err) {
      console.error("Failed to send follow request:", err);
    }
  };

  const handleUnFollow = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`http://localhost:4000/api/follow/${user._id}`, {
        method: "DELETE",
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

      setIsFollowAccepted(false);
      setSentRequest(false);
    } catch (err) {
      console.error("Failed to unfollow:", err);
    }
  };

  const handleAccept = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:4000/api/follow/accept/${user._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: currentUser ? `Bearer ${currentUser.token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      setReceivedRequest(false);
      setIsFollowAccepted(true);
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  };

  const handleReject = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:4000/api/follow/reject/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: currentUser ? `Bearer ${currentUser.token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      setReceivedRequest(false);
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };

  // 🔀 SWITCH GATE UI
  const renderButton = () => {
    if (isFollowAccepted) {
      return (
        <button
          className="border border-0 rounded"
          style={{ height: "40px", width: "150px" }}
          onClick={handleUnFollow}
        >
          Unfollow
        </button>
      );
    } else if (sentRequest) {
      return (
        <button
          className="border border-0 rounded"
          style={{ height: "40px", width: "150px" }}
          onClick={handleUnFollow}
        >
          Cancel Request
        </button>
      );
    } else if (receivedRequest) {
      return (
        <div className="d-flex gap-2">
          <button
            className="border border-0 rounded bg-success text-white"
            style={{ height: "40px", width: "100px" }}
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="border border-0 rounded bg-danger text-white"
            style={{ height: "40px", width: "100px" }}
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="border border-0 rounded"
          style={{ height: "40px", width: "150px" }}
          onClick={handleFollow}
        >
          Follow
        </button>
      );
    }
  };

  return (
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
        {renderButton()}
      </div>
    </div>
  );
}

export default UserList;
