import { useState, useEffect } from "react";

function FollowRequestList({ user }) {

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
        
      </div>
    </div>
  );
}

export default FollowRequestList;
