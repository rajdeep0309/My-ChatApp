import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import axios from "axios";

function UserProfile({ onClose }) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [submitfile, setSubmitfile] = useState({});
  const [save, setSave] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const local=JSON.parse(localStorage.getItem("userData"));
  const [userDetails, setUserDetails] = useState({
    fullname: local.fullname,
    phone: local.phone,
    avatar: local.avatar,
  });
  const optionsRef = useRef(null);
  useEffect(() => {
	const user = JSON.parse(localStorage.getItem("userData"));
	setUserDetails({
		
		fullname: user.fullname,
		phone: user.phone,
		avatar: user.avatar,
		linkedin: user.linkedin,
		github: user.github,
		twitter: user.twitter,
	});
	},[refresh]);


  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/updateAccountDetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //set updated data
    const user = JSON.parse(localStorage.getItem("userData"));
    axios
      .post("http://localhost:3001/api/v1/user/userdetails", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => {
		localStorage.setItem('userData', JSON.stringify(data.data.data.user));
		setRefresh(!refresh);
      });
  }, [save]);

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };
  const handleEditProfile = (e) => {
    console.log("Edit Profile");
    setSubmitfile(e.target.files[0]);
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

  const handleViewProfile = () => {
    setShowProfile(true);
  };
  const closeProfile = () => {
    setShowProfile(false);
  };
  const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
		  closeProfile();
		}
};
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT FILE", submitfile);
    const user = JSON.parse(localStorage.getItem("userData"));
    const fd = new FormData();
    fd.append("id", user._id);
    fd.append("avatar", submitfile);

    for (let [key, value] of fd.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/updateAvatar",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setSave(!save);
    setShowUploadOptions(false);
  };

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowEditOptions(false);
    }
  };

  useEffect(() => {
    if (showEditOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditOptions]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isEditingName) {
        handleNameSave();
      }
      if (isEditingNumber) {
        handleNumberSave();
      }
    }
  };

  const cardStyle = {
    position: "absolute ",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="card"
        style={cardStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
              <div className="edit-options" ref={optionsRef}>
                <ul className="options-list">
                  <li onClick={handleViewProfile}>View Profile</li>
                  {!showUploadOptions && (
                    <li onClick={() => setShowUploadOptions(true)}>Edit Profile</li>
                  )}
                </ul>
                {showUploadOptions && (
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', padding: '8px' }}>
                <input type="file" onChange={handleEditProfile} />
                <LuUpload  onClick={HandleSubmit} style={{ fontSize: '20px',fontWeight: 'bold', marginRight: '10px'}} /> 
                </div>
                )}
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
                    onKeyPress={handleKeyPress}
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
            {/* ////////////////////////////////////////////// */}
            <div className="user-profile-phone">
              <p>Phone Number</p>

              {isEditingNumber ? (
                <div className="user-profile-phone-number">
                  <input
                    type="text"
                    value={userDetails.phone}
                    onChange={handleNumberChange}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <IoIosSend
                    className="number-save-icon"
                    onClick={handleNumberSave}
                  />
                </div>
              ) : (
                <div className="phone-number-display">
                  <span>{userDetails.phone}</span>
                  <FaRegEdit
                    className="number-edit-icon"
                    onClick={() => setIsEditingNumber(true)}
                  />
                </div>
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

      {showProfile && (
        <div className="profile-backdrop" onClick={handleBackdropClick}>
          <div className="profile-picture-content" style={profilePictureStyle}>
            <button className="close-button" onClick={closeProfile}>
              <IoIosClose size={40} />
            </button>
            <img
              src={userDetails.avatar}
              alt="User Profile "
              className="user-profile-picture-large"
              style={{maxWidth: "80vw", maxHeight: "80vh", borderRadius: "8px"}}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default UserProfile;
