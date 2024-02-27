import "./style.scss";
import { Chat } from "./Chat.jsx";
import { DefaultWindow } from "./DefaultWindow.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { SettingWindow } from "./SettingWindow.jsx";
import { useState } from "react";
import { db, auth } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { ChangeAvatarWindow } from "./ChangeAvatarWindow.jsx";
import { ParentalControlWindow } from "./ParentalControlWindow.jsx";
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";

const HomeComponent = () => {
  const [show, setShow] = useState(false);
  const [isFocusMode, setFocusMode] = useState(false);
  const [isMessageScheduling, setMessageScheduling] = useState(false);
  const [isChatWindow, setChatWindow] = useState(false);
  const [isSettingsWindow, setSettingWindow] = useState(false);
  const [isChangeAvatarWindow, setChangeAvatarWindow] = useState(false);
  const [isParentalControlWindow, setParentalControlWindow] = useState(false);
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
          setMessageScheduling(userData.isMessageScheduling);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  fetchUserData();
  return (
    <div className="container">
      <div className="window">
        <Sidebar
          show={show}
          setShow={setShow}
          setChatWindow={setChatWindow}
          setSettingWindow={setSettingWindow}
          isFocusMode={isFocusMode}
        />
        {isSettingsWindow ? (
          <SettingWindow
            setSettingWindow={setSettingWindow}
            setShow={setShow}
            show={show}
            isChangeAvatarWindow={isChangeAvatarWindow}
            setChangeAvatarWindow={setChangeAvatarWindow}
            isParentalControlWindow={isParentalControlWindow}
            setParentalControlWindow={setParentalControlWindow}
            isMessageScheduling={isMessageScheduling}
            setMessageScheduling={setMessageScheduling}
          />
        ) : isChatWindow ? (
          <Chat
            setShow={setShow}
            show={show}
            isFocusMode={isFocusMode}
            isMessageScheduling={isMessageScheduling}
          />
        ) : (
          <DefaultWindow setShow={setShow} show={show} />
        )}
        {isChangeAvatarWindow && (
          <ChangeAvatarWindow
            isChangeAvatarWindow={isChangeAvatarWindow}
            setChangeAvatarWindow={setChangeAvatarWindow}
          />
        )}
        {isParentalControlWindow && (
          <ParentalControlWindow
            isParentalControlWindow={isParentalControlWindow}
            setParentalControlWindow={setParentalControlWindow}
          />
        )}
      </div>
    </div>
  );
};
export const Home = HomeComponent;
