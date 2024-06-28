import React from 'react';
import { useState, useEffect } from 'react';
import './ChatWindow.css';
import ChatArea from './ChatArea';
import SideBar from './list/left_sidebar/SideBar';
import { ContactContext } from '../store/contact-details-context';
import Wall from './Wallpaper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ChatWindow() {
	const [activeUser, setActiveUser] = useState('');
	const userData = JSON.parse(localStorage.getItem('userData'));
	console.log(userData);
	const nav = useNavigate();
	useEffect(() => {
		if (!userData) {
			console.log('User not Authenticated');
			nav('/');
		}
	}, [nav, userData]);
	const token = localStorage.getItem('accessToken');
	function handleSelectUser(e) {
		setActiveUser(e);
		
	}

	return (
		<ContactContext.Provider value={activeUser}>
			<div className='chat-window'>
				<SideBar onSelectUser={handleSelectUser}></SideBar>
				{activeUser ? <ChatArea></ChatArea> : <Wall></Wall>}
			</div>
		</ContactContext.Provider>
	);
}

export default ChatWindow;
