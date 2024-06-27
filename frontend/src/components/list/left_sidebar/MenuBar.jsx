import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import UserProfile from "./UserProfile";
import './list.css'; 

function MenuBar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleUserProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="menu-bar">
            <h1 className="menu-bar-title">C H A T O U T</h1>
            <div className="user-profile-container">
                    <img
                        src="https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg?auto=compress&cs=tinysrgb&w=600"
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
