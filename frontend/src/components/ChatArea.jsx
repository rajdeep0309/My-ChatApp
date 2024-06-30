import React, { useContext, useState, useRef } from 'react';
import './ChatArea.css';
import CallBtn from '../assets/Call Button.png';
import VideoBtn from '../assets/VC Button.png';
import SendBtn from '../assets/SendButton.png';
import MessageOthers from './chat/MessageOthers';
import MessageSelf from './chat/MessageSelf';
import { ContactContext } from '../store/contact-details-context';
import Profile from './list/right_sidebar/Profile';
import { motion, useScroll } from 'framer-motion';
function ChatArea() {
	const message = useRef();
	const [finalMessage, setFinalMessage] = useState('');
	const conCtx = useContext(ContactContext);
	const [selectedContact, setSelectedContact] = useState(null);
	function handleSubmit() {
		setFinalMessage(message.current.value);
		message.current.value = '';
	}
	const handleContactClick = () => {
		setSelectedContact(1);
	};
	const closeProfile = () => {
		setSelectedContact(null);
	};
	return (
		<>
			<div className='chat-area'>
				<div className='chat-area-header'>
					<div
						className='chat-area-header-text'
						onClick={() => handleContactClick()}>
						{conCtx.fullname}
					</div>
					<div className='chat-area-header-buttons'>
						<img
							src={CallBtn}
							alt='callbutton'
							className='chat-area-header-button'></img>
						<img
							src={VideoBtn}
							alt='callbutton'
							className='chat-area-header-button'></img>
					</div>
				</div>

				<div className='chat-area-messages'>
					<MessageOthers />
					<MessageSelf />
					<MessageOthers />
					<MessageSelf />
					<MessageOthers />
					<MessageSelf />
					<MessageOthers />
					<MessageSelf />
					<MessageOthers />
				</div>
				<div className='text-input-area'>
					<input
						ref={message}
						placeholder='Type a message.....'
						className='chat-area-type-area'
						onChange={(e) => {
							setFinalMessage(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.code == 'Enter') {
								handleSubmit();
							}
						}}></input>
					<div className='chat-area-send-button-container'>
						<img
							src={SendBtn}
							alt='callbutton'
							className='chat-area-send-button'></img>
					</div>
				</div>
			</div>
			{selectedContact && (
				<Profile contact={conCtx} closeProfile={closeProfile} />
			)}
		</>
	);
}

export default ChatArea;
