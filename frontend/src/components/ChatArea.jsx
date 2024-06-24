import React, { useState } from 'react';
import './ChatArea.css';
import CallBtn from '../assets/Call Button.png';
import VideoBtn from '../assets/VC Button.png';
import SendBtn from '../assets/SendButton.png';
import MessageOthers from './chat/MessageOthers';
import MessageSelf from './chat/MessageSelf';
import Contact from './list/left_sidebar/Contact';
import Profile from './list/right_sidebar/Profile';

function ChatArea() {
    const { contactInfo } = Contact(); 
    const [selectedContact, setSelectedContact] = useState(null);

    const handleProfileClick = (contact) => {
        setSelectedContact(contact);
    };

    const closeProfile = () => {
        setSelectedContact(null);
    };

    return (
        <div className='chat-area'>
            <div className='chat-area-header'>
                <div 
                    className='chat-area-header-text'
                    onClick={() => handleProfileClick(contactInfo[0])}
                    style={{ cursor: 'pointer' }}
                >
                    {contactInfo[0].name}
                </div>
                <div className='chat-area-header-buttons'>
                    <img
                        src={CallBtn}
                        alt='callbutton'
                        className='chat-area-header-button'
                    />
                    <img
                        src={VideoBtn}
                        alt='callbutton'
                        className='chat-area-header-button'
                    />
                </div>
            </div>

            <div className='chat-area-messages'>
                <MessageOthers />
                <MessageSelf />
            </div>
            <div className='text-input-area'>
                <input
                    placeholder='Type a message.....'
                    className='chat-area-type-area'
                />
                <div className='chat-area-send-button-container'>
                    <img
                        src={SendBtn}
                        alt='callbutton'
                        className='chat-area-send-button'
                    />
                </div>
            </div>
            {selectedContact && (
                <Profile contact={selectedContact} closeProfile={closeProfile} />
            )}
        </div>
    );
}

export default ChatArea;
