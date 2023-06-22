import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  // Define state to store the messages
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    // Subscribe to the onSnapshot event on the chats document for the current chatId
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // Check if the document exists and update the messages state
      doc.exists() && setMessages(doc.data().messages);
    });

    // Unsubscribe from the onSnapshot event when the component unmounts or when the chatId changes
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {/* Render each message using the Message component */}
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
