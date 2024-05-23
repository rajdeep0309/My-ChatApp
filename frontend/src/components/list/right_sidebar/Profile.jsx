import React from 'react';
import { IoIosClose } from "react-icons/io";
import './profile.css';

function Profile({ contact, closeProfile }) {
    return (
        <div className={`profile-container ${contact ? 'visible' : ''}`}>
            <button className="close-button" onClick={closeProfile}>
                <IoIosClose size={40} />
            </button>
            <div className="profile-content">
                <div className="profile-picture-container">
                    <img 
                        src={contact.profile_picture} 
                        alt={`${contact.name}'s profile`} 
                        className="profile-picture"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }} 
                    />
                </div>
                <h1 className="profile-name">{contact.name}</h1>
                <p className="profile-status">{contact.active ? "Online" : "Offline"}</p>
            </div>
            <div className="profile-details">
                <h1 className="profile-detail-item">{contact.location}</h1>
                <h1 className="profile-detail-item">{contact.contact_no}</h1>
                <h1 className="profile-detail-item">{contact.email}</h1>
            </div>
        </div>
    );
}

export default Profile;
