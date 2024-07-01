import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./list.css";
function MenuBar({ toggleUserProfile }) {
  const [avatar, setAvatar] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setAvatar(user.avatar);
    setRefresh(!refresh);
  },[refresh]);

  return (
    <div className="menu-bar">
      <h1 className="menu-bar-title">C H A T O U T</h1>
      <div className="user-profile-container">
        <img
          src={avatar}
          alt="User Profile"
          className="user-profile-image"
          onClick={toggleUserProfile}
        />
      </div>
      <FaPlus className="menu-bar-icon" />
    </div>
  );
}

export default MenuBar;
