import "./style.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import { Messages } from "./Messages.jsx";
import { Input } from "./Input.jsx";
import videoIcon from "../../assets/video-solid.svg";
import more from "../../assets/more.svg";
import focus from "../../assets/focus.svg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext.jsx";
import { db, auth } from "../../firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const Chat = ({ setShow, isFocusMode }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [userFocusMode, setUserFocusMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [limitTime, setLimitTime] = useState(0);
  const [isLimits, setLimits] = useState(false);
  const [chatDuration, setChatDuration] = useState(0);
  // const [today, setToday] = useState();
  // const [storedDay, setStoredDay] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      if (data && data.user) {
        try {
          const userRef = doc(db, "users", data.user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserFocusMode(userData.isFocus);
            setUserName(userData.displayName);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [data]);

  useEffect(() => {
    const fetchCurrUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(db, "users", userId);

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const currUserData = userDoc.data();
            setLimits(currUserData.isLimits || false);
            setLimitTime(currUserData.limitTime || 0);
            setChatDuration(currUserData.chatDuration || 0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchCurrUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update chat duration only if isLimits is true
      if (isLimits) {
        setChatDuration((prevDuration) => prevDuration + 1);
      }
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [isLimits]);

  useEffect(() => {
    // Update chat duration in database when it changes
    updateChatDurationInDatabase();
  }, [chatDuration]);

  useEffect(() => {
    // Reset chat duration to 0 at the start of a new day
    const today = new Date().getDate();
    const storedDay = parseInt(localStorage.getItem("currentDay"));
    // const today = 18;
    // const storedDay = 17;
    console.log(storedDay);
    console.log(today);
    if (today !== storedDay) {
      setChatDuration(0);
      localStorage.setItem("currentDay", today);
    }
  }, []);

  const updateChatDurationInDatabase = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        // Fetch user data to preserve other fields
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Update chatDuration in user's profile data
          await setDoc(userRef, { ...userData, chatDuration });
        }
        console.log(chatDuration);
      } catch (error) {
        console.error("Error updating chat duration in database:", error);
      }
    }
  };

  return (
    <div
      className="chat"
      onClick={(e) => {
        if (e.target.tagName === "svg" && e.target.classList.contains("back")) {
          setShow(true);
        } else {
          setShow(false);
        }
      }}
    >
      <div className="chatInfo">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <IoArrowBackOutline
            onClick={() => {
              setShow(true);
            }}
            className="back"
          />
          <span className="userContainer">
            <img className="userImg" src={data.user?.photoURL} alt="userImg" />
            {userFocusMode && (
              <img
                className="focusIcon"
                src={focus}
                alt="focus.svg"
                title="Focus mode is on"
              />
            )}
          </span>
          <span>
            {data.user?.displayName == currentUser.displayName
              ? currentUser.displayName + " (Me)"
              : data.user?.displayName}
          </span>
        </div>
        <div className="chatIcons">
          <img className="ham" src={videoIcon} alt="videoIcon" />
          <img className="ham" src={more} alt="more" />
        </div>
      </div>
      <Messages
        isFocusMode={isFocusMode}
        userFocusMode={userFocusMode}
        userName={userName}
      />
      <Input
        isLimits={isLimits}
        limitTime={limitTime}
        chatDuration={chatDuration}
      />
    </div>
  );
};
