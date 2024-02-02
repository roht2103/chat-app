// Messages.jsx
import "./style.scss";
import { Message } from "./Message.jsx";
import { useEffect, useContext, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.js";

export const Messages = ({ messages, setMessages }) => {
  const { data } = useContext(ChatContext);
  const [isFocusMode, setFocusMode] = useState(false);

  const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFocusMode(userData.isFocus);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      fetchUserData();

      // Update messages only if there are messages in the chat and the focus mode is off
      if (!isFocusMode && doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId, isFocusMode]);

  return (
    <div className="messages">
      {messages.map((m, index) => (
        <Message
          key={m.id}
          message={m}
          isSame={index > 0 && m.senderId === messages[index - 1].senderId}
        />
      ))}
    </div>
  );
};
