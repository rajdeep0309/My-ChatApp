import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";

function MenuBar ({closeSidebar}){
    return (
        <div className="flex items-center justify-between w-full">
            <h1 className="text-white text-3xl font-bold mr-auto ml-4">C H A T O U T</h1>
            {/* <FaPlus  className="text-white text-2xl ml-auto cursor-pointer"/> */}
            <FaBars 
               className="text-white text-2xl mr-4 ml-auto cursor-pointer"
               onClick={closeSidebar}
            />
        </div>
    );
}

export default MenuBar;