import React from "react";
import './ChatWindow.css';
import ChatArea from "./ChatArea";
import SideBar from "./list/left_sidebar/SideBar";
function ChatWindow() {
    return <div className="chat-window">
        <SideBar></SideBar>
        <ChatArea></ChatArea>
    </div>;
}

export default ChatWindow;