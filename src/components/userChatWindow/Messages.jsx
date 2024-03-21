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
  // const [currDate, setCurrDate] = useState();
  const [currTime, setCurrTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      // let d = new Date();
      // let y = d.getFullYear();
      // let m = d.getMonth() + 1;
      // let day = d.getDate() + 1;
      // let h = d.getHours();
      // let min = d.getMinutes();
      // setCurrDate(y + "-" + m + "-" + day);
      // setCurrTime(h + ":" + min);
      setCurrTime(new Date().valueOf());
    }, 2000); // 1 second interval

    return () => clearInterval(interval);
  }, [currTime]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // Get all messages from Firestore
      const allMessages = doc.data().messages || [];
      // Filter messages based on scheduled date and time
      allMessages.forEach((element) => {
        const str =
          element.scheduledDate + "T" + element.scheduledTime + ":00.000";

        const sheduled = new Date(str);
        // console.log(element.scheduledDate, element.scheduledTime);
        // console.log(str);
        // console.log(new Date().toLocaleDateString());
        // console.log(sheduled, currTime, sheduled - currTime);
        if (sheduled <= currTime) {
          element.isScheduled = false;
          // console.log("chnaged");
        }
      });
      // console.log("tick");
      const filteredMessages = allMessages.filter((m) => !m.isScheduled);
      // console.log(allMessages.length, filteredMessages.length);
      setMessages(filteredMessages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId, isFocusMode, currTime]);

  // messages.length > 2 &&
  //   console.log(
  //     messages[2].isScheduled,
  //     messages[2].scheduledDate <= currDate,
  //     messages[2].scheduledTime <= currTime
  //   );
  // console.log("curr Date: ", currDate);
  // console.log("curr time: ", currTime);

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
        messages.map((m, index) =>
          m.isScheduled &&
          m.scheduledDate <= currDate &&
          m.scheduledTime <= currTime ? (
            <Message
              key={`${m.id}_${m.senderId || uuid()}_${index}`}
              message={m}
              isSame={index > 0 && m.senderId === messages[index - 1].senderId}
            />
          ) : (
            !m.isScheduled && (
              <Message
                key={`${m.id}_${m.senderId || uuid()}_${index}`}
                message={m}
                isSame={
                  index > 0 && m.senderId === messages[index - 1].senderId
                }
              />
            )
          )
        )
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
