import React from 'react';
import { useState, useEffect } from 'react';
import './ChatWindow.css';
import ChatArea from './ChatArea';
import SideBar from './list/left_sidebar/SideBar';
import { ContactContext } from '../store/contact-details-context';
import Wall from './Wallpaper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './list/left_sidebar/list.css';
function ChatWindow() {
	const [activeUser, setActiveUser] = useState('');
	const [chatId, setChatId] = useState('');
	const userData = JSON.parse(localStorage.getItem('userData'));
	const[isProfileOpen, setIsProfileOpen] = useState(false);
	// console.log(userData);
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
	function handleChatId(e) {
		setChatId(e.data._id);
	}

	const toggleUserProfile = () => {
		setIsProfileOpen(!isProfileOpen);
	};

	return (
		<ContactContext.Provider value={activeUser}>
			<div className='chat-window'>
				<SideBar
					onSelectUser={handleSelectUser}
					getChatId={handleChatId} 
					toggleUserProfile={toggleUserProfile}/>
				{activeUser ? 
				<ChatArea activeUser={chatId} 
				isProfileOpen={isProfileOpen}
				toggleUserProfile={toggleUserProfile}/> : <Wall></Wall>}
			</div>
		</ContactContext.Provider>
	);
}

export default ChatWindow;
