import React, { useState} from 'react';
import { IoIosSend } from "react-icons/io";
import { IoIosClose } from 'react-icons/io';
import { FaRegEdit } from "react-icons/fa";
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import './list.css'

function UserProfile({onClose}) {
    const [showEditIcon, setShowEditIcon] = useState(false);
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    
    const [userDetails, setUserDetails] = useState({
        name: 'Abhik Panda',
        phoneNumber: '1234567890',
        profilePicture:'https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg?auto=compress&cs=tinysrgb&w=600',
    });
    
    const toggleEditOptions = () => {
        setShowEditOptions(!showEditOptions);
    };

    const handleViewProfile = () => {
        console.log('View Profile');
    };

    const handleEditProfile = () => {
        console.log('Edit Profile');
    };

    const handleNameChange = (e) => {
        setUserDetails({ ...userDetails, name: e.target.value });
    };
    const handleNameSave = () => {
        setIsEditingName(false);
        console.log('Name saved:', userDetails.name);
    };

    return (
        <>
        <div className="backdrop" onClick={onClose} />
        <div className='user-profile-modal'>
            <button className='close-button' onClick={onClose}>
					<IoIosClose size={40} />
				</button>
            <div className='user-profile-picture-container'
                 onMouseEnter={() => setShowEditIcon(true)}
                 onMouseLeave={() => setShowEditIcon(false)}
            >
                <img
                    src={userDetails.profilePicture}
                    alt='User Profile'
                    className={`user-profile-picture ${showEditIcon ? 'hovered' : ''}`}
                    
                />
                 {showEditIcon && (
                    <FaRegEdit
                        className='edit-icon'
                        onClick={toggleEditOptions}
                    />
                )}

                {showEditOptions && (
                    <div className='edit-options'>
                        <ul className='options-list'>
                            <li onClick={handleViewProfile}>View Profile</li>
                            <li onClick={handleEditProfile}>Edit Profile</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='user-profile-details'>
            <div className='user-profile-name'>
            {isEditingName ? (
                <div className='name-edit-field'>
                            <input
                                type='text'
                                value={userDetails.name}
                                onChange={handleNameChange}
                                autoFocus
                            />
                            <IoIosSend
                                className='name-save-icon'
                                onClick={handleNameSave}
                            />
                        </div>
                    ) : (
                        <>
                            <span>{userDetails.name}</span>
                            <FaRegEdit
                                className='name-edit-icon'
                                onClick={() => setIsEditingName(true)}
                            />
                        </>
                    )}
                </div>
                <div className='user-profile-phone'>
                    Phone Number
                    <p className='user-profile-phone-number'>
                        {userDetails.phoneNumber}
                    </p>
                </div>
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
        </div>
    </>
    );
}

export default UserProfile;
