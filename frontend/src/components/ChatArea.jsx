import React, { useContext, useState, useRef, useEffect } from "react";
import "./ChatArea.css";
import CallBtn from "../assets/Call Button.png";
import VideoBtn from "../assets/VC Button.png";
import SendBtn from "../assets/SendButton.png";
import MessageOthers from "./chat/MessageOthers";
import MessageSelf from "./chat/MessageSelf";
import { ContactContext } from "../store/contact-details-context";
import Profile from "./list/right_sidebar/Profile";
import { motion, useScroll } from "framer-motion";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import axios, { all } from "axios";

// const ENDPOINT = "https://my-chatapp-ygrg.onrender.com";.
const ENDPOINT = "https://my-chatapp-ygrg.onrender.com";
const nameFormat = (e) => {
  return e
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
var socket;
function ChatArea({ activeUser }) {
  ////console.log('This is from chatarea');
  ////console.log(activeUser);
  const message = useRef();
  const [finalMessage, setFinalMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const conCtx = useContext(ContactContext);
  ////console.log(conCtx._id);
  const [selectedContact, setSelectedContact] = useState(null);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const token = localStorage.getItem("accessToken");
  //console.log(token);
  const dataid = JSON.parse(localStorage.getItem("userData"));
  ////console.log(dataid._id);
  const sendMessage = () => {
    // Remove the declaration of 'data' since it is not being used.
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `https://my-chatapp-ygrg.onrender.com/api/v1/message/`,
        {
          content: finalMessage,
          chatId: activeUser,
          reciever: conCtx._id,
        },
        config
      )
      .then(({ data }) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };
  useEffect(() => {
    socket = io("https://my-chatapp-ygrg.onrender.com");
    socket.emit("setup", dataid);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  });
  useEffect(() => {
    ////console.log('Users refreshed');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `https://my-chatapp-ygrg.onrender.com/api/v1/message/${activeUser}`,
        config
      )
      .then(({ data }) => {
        setAllMessages(data);
        socket.emit("join_chat", activeUser);
        //console.log("Data from Acess Chat API ", data);
      });
    setAllMessagesCopy(allMessages);
    // scrollToBottom();
  }, [activeUser, token, allMessages]);
  ////console.log(allMessages);
  function handleSubmit() {
    setFinalMessage(message.current.value);
    sendMessage();
    setFinalMessage("");
    message.current.value = "";
  }
  const handleContactClick = () => {
    setSelectedContact(1);
  };
  const closeProfile = () => {
    setSelectedContact(null);
  };

  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);
  return (
    <>
      <div
        className="chat-area"
        ref={chatContainerRef}
        style={{
          overflowY: "scroll",
        }}
      >
        <div className="chat-area-header">
          <div
            className="chat-area-header-text"
            onClick={() => handleContactClick()}
          >
            {nameFormat(conCtx.fullname)}
          </div>
          <div className="chat-area-header-buttons">
            <img
              src={CallBtn}
              alt="callbutton"
              className="chat-area-header-button"
            ></img>
            <img
              src={VideoBtn}
              alt="callbutton"
              className="chat-area-header-button"
            ></img>
          </div>
        </div>

        <div className="chat-area-messages">
          {allMessages.slice(0).map((message, index) => {
            const sender = message.sender;
            const self_id = dataid._id;

            if (sender._id === self_id) {
              ////console.log('I sent it ');
              return <MessageSelf props={message} key={index} />;
            } else {
              ////console.log('Someone Sent it');
              return <MessageOthers props={message} key={index} />;
            }
          })}
        </div>
        <div className="text-input-area">
          <input
            ref={message}
            placeholder="Type a message....."
            className="chat-area-type-area"
            onChange={(e) => {
              setFinalMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code == "Enter") {
                handleSubmit();
              }
            }}
          ></input>
          <div
            className="chat-area-send-button-container"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            <img
              src={SendBtn}
              alt="callbutton"
              className="chat-area-send-button"
            ></img>
          </div>
        </div>
      </div>
      {selectedContact && (
        <Profile contact={conCtx} closeProfile={closeProfile} />
      )}
    </>
  );
}

export default ChatArea;
