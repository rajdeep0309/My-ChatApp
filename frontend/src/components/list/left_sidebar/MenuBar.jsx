import React from "react";
import { FaPlus } from "react-icons/fa";
import './list.css'; 

function MenuBar() {
    return (
        <div className="menu-bar">
            <h1 className="menu-bar-title">C H A T O U T</h1>
            <FaPlus 
                className="menu-bar-icon"
            />
        </div>
    );
}

export default MenuBar;
