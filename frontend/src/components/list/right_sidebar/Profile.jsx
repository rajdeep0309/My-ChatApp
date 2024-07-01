import React, {useState} from 'react';
import { IoIosClose } from 'react-icons/io';
import './profile.css';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { AnimatePresence, motion, useScroll } from 'framer-motion';

const nameFormat = (name) => {
	return name
	  .split(' ')
	  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
	  .join(' ');
};

function Profile({ contact, closeProfile }) {
	const [showProfile, setShowProfile] = useState(false);
	const handleViewProfile = () => {
		setShowProfile(true);
	  };
	  const closedProfile = () => {
		setShowProfile(false);
	  };
	  const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
		  closedProfile();
		}
	  };
	const profilePictureStyle = {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		zIndex: 200,
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "8px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className={`profile-container ${contact ? 'visible' : ''}`}>
				<button className='close-button' onClick={closeProfile}>
					<IoIosClose size={40} />
				</button>
				<div className='profile-content'>
					<div className='profile-picture-container'>
						<img
							src={contact.avatar}
							alt={`${contact.fullname}'s profile`}
							className='profile-picture'
							onClick={handleViewProfile}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = 'https://via.placeholder.com/150';
							}}
						/>
					</div>
					<h1 className='profile-name'>{nameFormat(contact.fullname)}</h1>
					<p className='profile-status'>
						{contact.active ? 'Online' : 'Offline'}
					</p>
				</div>
				<div className='profile-details'>
					<h1 className='profile-detail-item'>{contact.address}</h1>
					<h1 className='profile-detail-item'>{contact.phone}</h1>
					<h1 className='profile-detail-item'>{contact.email}</h1>
				</div>
				<div className='profile-media'>
					<h1 className='profile-media-heading'>Media</h1>
					<div className='media-buttons'>
						<button className='media-button'>
							<FaGithub size={40} />
						</button>
						<button className='media-button'>
							<FaLinkedin size={40} />
						</button>
						<button className='media-button'>
							<FaSquareXTwitter size={40} />
						</button>
					</div>
				</div>
			</motion.div>
			{showProfile && (
        <div
          className="contact-profile-backdrop"
		  onClick={handleBackdropClick}
          
        >
          <div
            className="contact-profile-picture-content"
            style={profilePictureStyle}
          >
            <button className="close-button" onClick={closedProfile}>
              <IoIosClose size={40} />
            </button>
            <img
              src={contact.avatar}
              alt="Contact Profile "
              className="contact-profile-picture-large"
              style={{ maxWidth: "80vw", maxHeight: "80vh", borderRadius: "8px" }}
            />
          </div>
        </div>
      )}
		</AnimatePresence>
	);
}

export default Profile;
