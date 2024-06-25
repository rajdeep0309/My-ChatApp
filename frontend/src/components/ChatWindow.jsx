import React from 'react';
import { useState } from 'react';
import './ChatWindow.css';
import ChatArea from './ChatArea';
import SideBar from './list/left_sidebar/SideBar';
import { ContactContext } from '../store/contact-details-context';
import Wall from './Wallpaper'
function ChatWindow() {
    const [activeUser, setActiveUser] = useState('');
    function handleSelectUser(e){
        setActiveUser(e);
    }
    
	return (
		<ContactContext.Provider value={activeUser}>
			<div className='chat-window'>
				<SideBar onSelectUser={handleSelectUser}></SideBar>
				{ activeUser ? (<ChatArea></ChatArea>) : (<Wall></Wall>) }
				
			</div>
		</ContactContext.Provider>
	);
}

export default ChatWindow;
