import React from 'react';
import './Chats.css';
function MessageSelf() {
    var props1 = { name: 'Shoal', message: 'something' };
	return (
		<div className='self-message-container'>
			<div className='conversation-container'>
				<p className='con-icon'>
					<h1>{props1.name[0]}</h1>
				</p>
				<div className='conversation-content'>
					<p className='con-message'>{props1.message}</p>
					<p className='con-lastMessage'>12:00am</p>
				</div>
			</div>
		</div>
	);
}

export default MessageSelf;
