import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import notifSound from "../audio/notif.mp3"; // Import the audio file

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const audioRef = useRef(new Audio(notifSound)); // Add audioRef useRef

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    if (message.senderId !== currentUser.uid) {
      audioRef.current.src = notifSound; // Set the audio source
      audioRef.current.play();
    }

  }, [message]);
  

  function formatDate(timestamp) {
    let date;

    if (timestamp && typeof timestamp === "object" && timestamp.hasOwnProperty("seconds") && timestamp.hasOwnProperty("nanoseconds")) {
      // Handle custom object format with seconds and nanoseconds properties
      const seconds = timestamp.seconds || 0;
      const milliseconds = seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
      date = new Date(milliseconds);
    } else if (typeof timestamp === "object") {
      const year = 1970;
      const month = 0;
      const day = 1;
      date = new Date(year, month, day);
    } else {

      timestamp = String(timestamp);
      date = new Date(timestamp);
    }

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }
  
  
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Message;