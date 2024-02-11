// Messages.jsx
import "./style.scss";
import { Message } from "./Message.jsx";
import { useEffect, useContext, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { v4 as uuid } from "uuid";
import chattingBoy from "../../assets/chatting-boy.json";
import focusAnimation from "../../assets/focusAnimation.json";
import Lottie from "lottie-react";

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
      {messages && !isFocusMode && messages.length == 0 && (
        <div className="h-full flex align-center">
          <div className="w-72 m-auto">
            <Lottie loop={true} animationData={chattingBoy} />
          </div>
        </div>
      )}
      {!isFocusMode &&
        messages.length > 0 &&
        messages.map((m, index) => (
          <Message
            key={`${m.id}_${m.senderId || uuid()}_${index}`} // Combine message ID with sender ID or generate a new one
            message={m}
            isSame={index > 0 && m.senderId === messages[index - 1].senderId}
          />
        ))}
      {isFocusMode && (
        <div className=" w-full">
          <div className="w-72 h-fit flex align-middle justify-center m-auto ">
            <Lottie loop={true} animationData={focusAnimation} />
          </div>
          <p className="w-fit self-center ChatfocusIndicator">
            "Focus mode is currently active. During this time, you won't be able
            to send, receive, or view messages to maintain a distraction-free
            experience."
          </p>
        </div>
      )}
      {userFocusMode && (
        <p className="ChatfocusIndicator">
          "{userName} is currently in focus mode and cannot receive messages."
        </p>
      )}
    </div>
  );
};
