import { useEffect, useState } from "react";
import UserList from "./UserList";  

function Suggest() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
          const user = JSON.parse(localStorage.getItem('user'));
          const response = await fetch("http://localhost:4000/api/users", {
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
    return(
        <>
            <div>
                {users.map((user, index) => (
                    <UserList key={user._id || index} user = {userInfo}/>
                ))}
            </div>
        </>
    );
}

export default Suggest;