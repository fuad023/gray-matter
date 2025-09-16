import { useEffect, useState } from "react";
import LinkedExample from "../Sidebar_list";
import UserList from "./UserList";

function Suggest() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: user ? `Bearer ${user.token}` : "",
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
  return (
    <>
      <div style={{ height: "70px" }}>This is home</div>
      <div className="d-flex">
        <div className="d-none d-lg-block border me-4" style={{width: '200px', minWidth:'200px'}}>
        </div>
        <div className="d-none d-lg-block border me-4 position-fixed" style={{width: '200px'}}>
          <LinkedExample/>
        </div>
        <div className="border flex-grow-1 p-4" style={{maxWidth: '800px'}}>
        {users.map((user, index) => (
          <UserList key={user._id || index} user={user} />
        ))}
      </div>
      </div>
      
    </>
  );
}

export default Suggest;
