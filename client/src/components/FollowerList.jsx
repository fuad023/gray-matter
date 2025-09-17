import { useState, useEffect } from "react";

function FollowerList({ user }) {

    const [sentRequest, setSentRequest] = useState(false);
  const [receivedRequest, setReceivedRequest] = useState(false);
      
    const handleCancel = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`http://localhost:4000/api/follow/reject/${user._id}`, {
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

      setSentRequest(false);
    } catch (err) {
      console.error("Failed to cancel follow request:", err);
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

      setReceivedRequest(true);
    } catch (err) {
      console.error("Failed to accept request:", err);
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
        </div>
      </div>
      <div className="d-flex ms-auto justify-content-center align-items-center border rounded gap-2">
        {!receivedRequest && <button onClick={handleAccept}>Accept</button>}
        {!receivedRequest && <button onClick={handleCancel}>Cancel</button>}
      </div>
    </div>
  );
}

export default FollowerList;
