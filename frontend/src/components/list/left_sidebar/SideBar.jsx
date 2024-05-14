import React from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import MenuBar from "./MenuBar";
import Contact from "./Contact";


function SideBar({closeSidebar}) {
    const jsonContactInfo = Contact();

    const contactInfo = JSON.parse(jsonContactInfo);    
    return (
        <>
        <div className= " fixed top-0 left-0 bg-blue-500 h-full w-1/4 flex flex-col justify-start items-start p-4 rounded-tr-3xl rounded-br-3xl">
            <MenuBar closeSidebar={closeSidebar}/>
            <SearchBar />
            <div className="mt-10">
                {contactInfo.map(contact => (
                <h1 
                 className="text-gray-100 text-xl font-bold mt-4 ml-10"
                 key={contact.id}>{contact.name}</h1>
                ))}
            </div>
            <Login />
        </div>
    </>
    )
}

export default SideBar