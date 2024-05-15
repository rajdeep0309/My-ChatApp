import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBar from './SideBar';
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div 
      className="flex fixed top-0 left-0 bg-blue-500 h-full flex-col justify-start items-start p-4 rounded-tr-xl rounded-br-xl ">
        <FaBars className="text-white text-2xl mr-4 cursor-pointer " 
        onClick={toggleSidebar} />
        <IoIosLogOut className="text-white text-2xl mt-auto cursor-pointer " />

      </div>

      {isSidebarOpen && <SideBar closeSidebar={closeSidebar}/> }
    </div>

  );
}

export default Navbar;