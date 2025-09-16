import { format, set } from "date-fns";

function UserList({ user }) {
  return (
    <>
      <div className="border d-flex gap-3 p-3 mb-4 align-items-center rounded">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-circle"
          width="85"
          height="85"
        />
        <div>
          <div className="fs-3 fw-semibold">
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
          >
            Follow
          </button>
        </div>
      </div>
    </>
  );
}

export default UserList;
