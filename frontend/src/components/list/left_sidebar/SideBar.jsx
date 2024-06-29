import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Logout from './Logout';
import MenuBar from './MenuBar';
import Contact from './Contact';
import Profile from '../right_sidebar/Profile';
import axios from 'axios';

function SideBar({ onSelectUser, getChatId}) {
	const [contactInfo, setContactInfo] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);
	const [refreshed, setRefreshed] = useState(false);
    const [conversations, setConversations] =  useState([]);
	const handleContactClick = (contact,response) => {
		setSelectedContact(contact);
		onSelectUser(contact);
		getChatId(response);
	};
	// const userData = JSON.parse(localStorage.getItem('userData'));
	const token = localStorage.getItem('accessToken');
	// console.log(token);
	useEffect(() => {
		const getUsers = async () => {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				const responses = await axios
					.get('http://localhost:3001/api/v1/user/fetchUsers', config)
					.then((data) => {
						console.log('UData refreshed in Users panel ');
						setContactInfo(data.data);
						
						// setRefresh(!refresh);
					});
				// console.log(responses);
			} catch (e) {
				console.log(e);
			}
		};
		getUsers();
	}, [refreshed]);
	useEffect(() => {
		// console.log("Sidebar : ", user.token);
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios.get('http://localhost:3001/api/v1/chat/', config).then((response) => {
			console.log('Data refresh in sidebar ', response.data);
			setConversations(response.data);

			// setRefresh(!refresh);
		});
	},[]);
	console.log(contactInfo);
	const closeProfile = () => {
		setSelectedContact(null);
	};

	return (
		<>
			<div className='sidebar-container'>
				<MenuBar />
				<SearchBar />
				<div className='contacts-container'>
					{contactInfo.map((contact) => (
						<div
							key={contact._id}
							className='contact-item'
							onClick={() => {
								
								console.log('Creating chat with ', contact.fullname);
								const config = {
									headers: {
										Authorization: `Bearer ${token}`,
									},
								};
								axios.post(
									'http://localhost:3001/api/v1/chat/',
									{
										userId: contact._id,
									},
									config
								).then((response) => {
									handleContactClick(contact,response)
								});
							}}>
							<div className='contact-image-container'>
								<img
									src={contact.avatar}
									alt={`${contact.fullname}'s profile`}
									className='contact-image'
								/>
								{contact.active && (
									<span className='contact-active-indicator'></span>
								)}
							</div>
							<span
								className='contact-name'>
								{contact.fullname}
							</span>
						</div>
					))}
				</div>
				<Logout />
			</div>
		</>
	);
}

export default SideBar;
