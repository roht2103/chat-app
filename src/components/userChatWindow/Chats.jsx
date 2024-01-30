import "./style.scss";
import { ChatUser } from "./ChatUser";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext.jsx";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const Chats = ({ setChatWindow, setShow, show, setSettingWindow }) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chatUsers">
      {(chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <ChatUser
              onClick={() => {
                handleSelect(chat[1].userInfo);
                setChatWindow(true);
                setShow(!show);
                setSettingWindow(false);
              }}
              key={chat[1].userInfo.uid}
              profileUrl={chat[1].userInfo.photoURL}
              name={chat[1].userInfo.displayName}
              lastMsg={chat[1].lastMessage?.text}
              time={chat[1].date}
            />
          ))) ||
        null}
    </div>
  );
};
