import React from 'react';
import './ChatArea.css';
import CallBtn from '../assets/Call Button.png';
import VideoBtn from '../assets/VC Button.png';
import SendBtn from '../assets/SendButton.png';
function ChatArea() {
	return (
		<div className='chat-area'>
			<div className='chat-area-header'>
				<div className='chat-area-header-text'>Rajdeep Ghosh</div>
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

			<div className='chat-area-messages'>Body</div>
			<div className=     'text-input-area'>
				<input
					placeholder='Type a message.....'
					className='chat-area-type-area'></input>
				<div className='chat-area-send-button-container'>
					<img
						src={SendBtn}
						alt='callbutton'
						className='chat-area-send-button'></img>
				</div>
			</div>
		</div>
	);
}

export default ChatArea;
