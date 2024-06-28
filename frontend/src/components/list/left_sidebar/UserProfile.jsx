import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import axios from "axios";


function UserProfile({ onClose }) {
  // const [details, setDetails] = useState({});

  // const data=JSON.parse(localStorage.getItem(data.data.data.user));
  // setDetails(data);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);

  const [save, setSave] = useState(false);
  // console.log(data);
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    phone: "",
    avatar: "",
  });
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/updateAccountDetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) =>{
		console.log(response);
	  })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
//set updated data
const data = JSON.parse(localStorage.getItem("userData"));
axios.post("http://localhost:3001/api/v1/user/userdetails",data.data.data.user ,{
	headers: {
		Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
}).then((data1) => {
	setUserDetails({
		fullname: data1.data.data.user.fullname,
		phone: data1.data.data.user.phone,
		avatar: data1.data.data.user.avatar,
		linkedin: data1.data.data.user.linkedin,
		github: data1.data.data.user.github,
		twitter: data1.data.data.user.twitter,
	});
});
}, [save]);

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };

  const handleViewProfile = () => {
    console.log("View Profile");
  };
  const updateAvatar = async(e) => {
	// console.log("Update Avatar", e.target.files[0]);
	// const data = JSON.parse(localStorage.getItem('userData'));
	// const fd = new FormData();
	// fd.append('id', data.data.data.user._id);
	// fd.append('avatar', e.target.files[0]);
	// const response = await axios.post(
	// 	'http://localhost:3001/api/v1/user/updateAvatar',
	// 	fd,
	// 	{
	// 		headers: {
	// 			'Content-Type': 'multipart/form-data',
	// 			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

	// 		},
	// 	}
	// );

	// if (response.data.success) {
	// 	setSave(!save);
	// 	console.log("Profile Picture Updated");
	// }
	 };

  const handleEditProfile =(e) => {
	console.log("Edit Profile");
	updateAvatar(e);
	
  };

  const handleNameChange = (e) => {
    setUserDetails({ ...userDetails, fullname: e.target.value });
  };
  const handleNameSave = () => {
    setIsEditingName(false);

	console.log("Name saved:", userDetails.fullname);

    setSave(!save);
  };

  const handleNumberChange = (e) => {
    setUserDetails({ ...userDetails, phone: e.target.value });
    // setSave(!save);
  };
  const handleNumberSave = () => {
    setIsEditingNumber(false);
	console.log("Number saved:", userDetails.phone);
	// toast("Name saved successfully!");
    setSave(!save);
  };

  const cardStyle = {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <AnimatePresence>
      <motion.div
        className="card"
        style={cardStyle}
        initial="hidden"
        animate="visible"
      >
        <div className="backdrop" onClick={onClose} />
        <div className="user-profile-modal">
          <button className="close-button" onClick={onClose}>
            <IoIosClose size={40} />
          </button>
          <div
            className="user-profile-picture-container"
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            <img
              src={userDetails.avatar}
              alt="User Profile"
              className={`user-profile-picture ${showEditIcon ? "hovered" : ""}`}
            />
            {showEditIcon && (
              <FaRegEdit className="edit-icon" onClick={toggleEditOptions} />
            )}

            {showEditOptions && (
              <div className="edit-options">
                <ul className="options-list">
                  <li onClick={handleViewProfile}>View Profile</li>
                  <li >
					<input type="file"onChange={handleEditProfile} value={(e)=>e.target.value} placeholder="Edit Profile" />
					</li>
                </ul>
              </div>
            )}
          </div>
          <div className="user-profile-details">
            <div className="user-profile-name">
              {isEditingName ? (
                <div className="name-edit-field">
                  <input
                    type="text"
                    value={userDetails.fullname}
                    onChange={handleNameChange}
                    autoFocus
                  />
                  <IoIosSend
                    className="name-save-icon"
                    onClick={handleNameSave}
                  />
                </div>
              ) : (
                <>
                  <span>{userDetails.fullname}</span>
                  <FaRegEdit
                    className="name-edit-icon"
                    onClick={() => setIsEditingName(true)}
                  />
                </>
              )}
            </div>
		{/* //////////////////need to beautify////////////// */}
			<div className="user-profile-phone">
				<h3>Phone Number</h3>
		
              {isEditingNumber ? (
                <div className="user-profile-phone-number">
                  <input
                    type="text"
                    value={userDetails.phone}
                    onChange={handleNumberChange}
                    autoFocus
                  />
                  <IoIosSend
                    className="name-save-icon"
                    onClick={handleNumberSave}
                  />
                </div>
              ) : (
                <>
                  <span>{userDetails.phone}</span>
                  <FaRegEdit
                    className="name-edit-icon"
                    onClick={() => setIsEditingNumber(true)}
                  />
                </>
              )}
            </div>
			{/* ////////////////////////////////////////////// */}
          </div>
          <div className="profile-media">
            <h1 className="profile-media-heading">Media</h1>
            <div className="media-buttons">
              <button className="media-button">
                <a href={userDetails.github}>
                  <FaGithub size={40} />
                </a>
              </button>
              <button className="media-button">
                <a href={userDetails.linkedin}>
                  <FaLinkedin size={40} />
                </a>
              </button>
              <button className="media-button">
                <a href={userDetails.twitter}>
                  <FaSquareXTwitter size={40} />
                </a>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserProfile;
