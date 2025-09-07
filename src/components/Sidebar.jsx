import React from 'react'

const Sidebar = () => {
  return (
    <div
  className="bg-light border-end vh-100 position-fixed"
  style={{ width: "250px", top: 0, left: 0, paddingTop: "56px" }}
>
  <ul className="nav flex-column">
    <li className="nav-item">
      <a href="#" className="nav-link active">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link">
        About
      </a>
    </li>
    {/* Add more sidebar links */}
  </ul>
</div>


  )
}

export default Sidebar
