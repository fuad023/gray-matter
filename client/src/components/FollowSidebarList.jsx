function followSidebarList({user}) {
    return(
        <>
        <div className="d-flex align-items-center gap-2 p-2 border-bottom">   
            <div><img
                  src="https://i.pravatar.cc/40"
                  alt="user profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                /></div>
        <div>{user.name + " " + user.surname}</div>
        </div>
        
        </>
    );
}

export default followSidebarList;