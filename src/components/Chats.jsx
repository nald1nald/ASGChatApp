import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  // Define a state to store the chats
  const [chats, setChats] = useState([]);

  // Access the currentUser and dispatch function from the respective contexts
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    // Define a function to fetch the chats from Firestore
    const getChats = () => {
      // Subscribe to the onSnapshot event on the userChats document for the current user
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // Update the chats state with the data from Firestore
        setChats(doc.data());
      });

      // Unsubscribe from the onSnapshot event when the component unmounts
      return () => {
        unsub();
      };
    };

    // Fetch the chats only if the currentUser.uid exists
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // Handle the selection of a chat user
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>Last Message: {chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
