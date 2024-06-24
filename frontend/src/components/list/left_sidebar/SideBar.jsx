import React, {useState} from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import MenuBar from "./MenuBar";
import Contact from "./Contact";
import Profile from "../right_sidebar/Profile";


function SideBar({ onSelectUser }) {
    const { contactInfo } = Contact();
    const [selectedContact, setSelectedContact] = useState(null);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        onSelectUser(contact);
    };

    const closeProfile = () => {
        setSelectedContact(null);
    };

    return (
        <>
            <div className="sidebar-container">
                <MenuBar />
                <SearchBar />
                <div className="contacts-container">
                    {contactInfo.map((contact) => (
                        <div
                            key={contact.socket_id}
                            className="contact-item"
                        >
                            <div className="contact-image-container">
                                <img
                                    src={contact.profile_picture}
                                    alt={`${contact.name}'s profile`}
                                    className="contact-image"
                                    onClick={() => handleContactClick(contact)}    
                                />
                                {contact.active && (
                                    <span className="contact-active-indicator"></span>
                                )}
                            </div>
                            <span className="contact-name">{contact.name}</span>
                        </div>
                    ))}
                </div>
                <Login />
            </div>
            {selectedContact && (
                <Profile contact={selectedContact} closeProfile={closeProfile} />
            )}
        </>
    );
}

export default SideBar;
