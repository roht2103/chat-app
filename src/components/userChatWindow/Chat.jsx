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
  const [exceeded, setExceeded] = useState(false);

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
        exceeded={exceeded}
        setExceeded={setExceeded}
      />
      <Input exceeded={exceeded} setExceeded={setExceeded} />
    </div>
  );
};
