import "./style.scss";
import { ChatUser } from "./ChatUser";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="chatUsers">
      {Object.entries(chats)?.map((chat) => (
        <ChatUser
          key={chat[1].userInfo.uid}
          profileUrl={chat[1].userInfo.photoURL}
          name={chat[1].userInfo.displayName}
        />
      ))}
    </div>
  );
};
