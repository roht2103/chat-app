// Messages.jsx
import "./style.scss";
import { Message } from "./Message.jsx";
import { useEffect, useContext, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { v4 as uuid } from "uuid";

export const Messages = ({ isFocusMode, userFocusMode, userName }) => {
  const { data } = useContext(ChatContext);
  // const [isFocusMode, setFocusMode] = useState(false);
  const [messages, setMessages] = useState([]);

  // const fetchUserData = async () => {
  //   const currentUser = auth.currentUser;
  //   if (currentUser) {
  //     const userId = currentUser.uid;
  //     const userRef = doc(db, "users", userId);

  //     try {
  //       const userDoc = await getDoc(userRef);
  //       if (userDoc.exists()) {
  //         const userData = userDoc.data();
  //         setFocusMode(userData.isFocus);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }
  // };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // fetchUserData();

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
      {!isFocusMode &&
        messages &&
        messages.map((m, index) => (
          <Message
            key={`${m.id}_${m.senderId || uuid()}_${index}`} // Combine message ID with sender ID or generate a new one
            message={m}
            isSame={index > 0 && m.senderId === messages[index - 1].senderId}
          />
        ))}
      {isFocusMode && (
        <p className="ChatfocusIndicator">
          "Focus mode is currently active. During this time, you won't be able
          to send, receive, or view messages to maintain a distraction-free
          experience."
        </p>
      )}
      {userFocusMode && (
        <p className="ChatfocusIndicator">
          "{userName} is currently in focus mode and cannot receive messages."
        </p>
      )}
    </div>
  );
};
