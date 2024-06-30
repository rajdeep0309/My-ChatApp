import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import UserProfile from "./UserProfile";
import './list.css'; 
import axios from "axios";
// import { set } from "mongoose";

function MenuBar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        const data= JSON.parse(localStorage.getItem("userData"));
        setAvatar(data.data.data.user.avatar);
    },[]);
    
    const toggleUserProfile = () => {
        
        setIsProfileOpen(!isProfileOpen);
    };

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
                    {isProfileOpen && <UserProfile onClose={toggleUserProfile} />}
                </div>
            <FaPlus 
                className="menu-bar-icon"
            />
        </div>
    );
}

export default MenuBar;
