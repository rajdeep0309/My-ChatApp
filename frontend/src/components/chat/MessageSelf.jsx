import React from 'react';
import './Chats.css';
import { AnimatePresence, motion } from 'framer-motion';
function MessageSelf({props}) {
	var props1 = { name: 'Shoal', message: 'something' };
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				transition={{
					ease: 'anticipate',
					duration: '0.4',
				}}
				whileHover={{ scale: 1.06 }}
				whileTap={{ scale: 0.8 }}
				className='self-message-container'>
				<div className='conversation-container'>
					<div className='conversation-content'>
						<p className='con-message'>{props.content}</p>
						<p className='con-lastMessage'>12:00am</p>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

export default MessageSelf;
