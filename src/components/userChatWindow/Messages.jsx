import "./style.scss";
import { Message } from "./Message.jsx";
import { useEffect, useContext, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext.jsx";
import { doc } from "firebase/firestore";
import { db } from "../../firebase.js";
export const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

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
