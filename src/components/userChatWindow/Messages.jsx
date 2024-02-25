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
import watch from "../../assets/watch.json";
import focus from "../../assets/focus.svg";
import Lottie from "lottie-react";
import DateTimePicker from "./DateTimePicker.jsx";

export const Messages = ({
  isFocusMode,
  userFocusMode,
  userName,
  exceeded,
  setExceeded,
  setShowTimePicker,
  isTimePicker,
  isScheduled,
  setScheduled,
  date,
  setDate,
  time,
  setTime,
}) => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId, isFocusMode]);

  return (
    <div className="messages">
      {messages && !isFocusMode && !exceeded && messages.length == 0 && (
        <div className="h-full flex align-center">
          <div className="w-72 m-auto">
            <Lottie loop={true} animationData={chattingBoy} />
          </div>
        </div>
      )}
      {isFocusMode ? (
        <div className=" w-full h-full flex items-center">
          <div className="flex flex-col items-center">
            <img className="w-44" src={focus} alt="" />
            <p className="w-fit self-center ChatfocusIndicator">
              "Focus mode is currently active. During this time, you won't be
              able to send, receive, or view messages to maintain a
              distraction-free experience."
            </p>
          </div>
        </div>
      ) : exceeded ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-72">
            <Lottie loop={true} animationData={watch} />
          </div>
          <p className="ChatfocusIndicator flex items-center">
            "Sorry, you've reached the time limit for chatting. Come back
            tommorrow."
          </p>
        </div>
      ) : (
        messages.length > 0 &&
        messages.map((m, index) => (
          <Message
            key={`${m.id}_${m.senderId || uuid()}_${index}`} // Combine message ID with sender ID or generate a new one
            message={m}
            isSame={index > 0 && m.senderId === messages[index - 1].senderId}
          />
        ))
      )}
      {isTimePicker && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DateTimePicker
            setShowTimePicker={setShowTimePicker}
            isScheduled={isScheduled}
            setScheduled={setScheduled}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
          />
        </div>
      )}
      {!exceeded && userFocusMode && (
        <p className="ChatfocusIndicator">
          "{userName} is currently in focus mode and cannot receive messages."
        </p>
      )}
    </div>
  );
};
