import { IoArrowBackOutline } from "react-icons/io5";
import { Switch } from "antd";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const SettingWindow = ({
  setShow,
  setSettingWindow,
  isChangeAvatarWindow,
  setChangeAvatarWindow,
  isParentalControlWindow,
  setParentalControlWindow,
}) => {
  const [isFocusMode, setFocusMode] = useState(true);

  useEffect(() => {
    // Fetch the user document from Firestore when the component mounts
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(db, "users", userId);

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFocusMode(userData.isFocus || false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []); // Run this effect only once when the component mounts

  const handleSwitchChange = async (checked) => {
    setFocusMode(checked);

    // Update isFocus in the database
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        await updateDoc(userRef, {
          isFocus: checked,
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <div className="settingWindow" onClick={() => setShow(false)}>
      <header>
        <IoArrowBackOutline
          style={{
            width: "35px",
            height: "35px",
            marginRight: "10px",
            cursor: "pointer",
            padding: "2px",
          }}
          className="backSetting"
          onClick={() => setSettingWindow(false)}
        />
        <h1>Settings</h1>
      </header>
      <div className="settings">
        <div
          className="setting"
          style={{ cursor: "pointer" }}
          onClick={() => setChangeAvatarWindow(!isChangeAvatarWindow)}
        >
          <span>
            <h2>Change Avatar</h2>
          </span>
        </div>
        <div className="setting">
          <span>
            <h3>Focus mode</h3>
            <Switch checked={isFocusMode} onChange={handleSwitchChange} />
          </span>
          <p>
            By turning on the focus mode, you will not receive any messages from
            your friends.
          </p>
        </div>
        <div
          className="setting"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setParentalControlWindow(!isParentalControlWindow);
          }}
        >
          <span>
            <h3>Parental Controls</h3>
          </span>
          <p>
            Set limits on chatting. After the limit is reached, chatting will be
            disabled. Accessible only by parents with a password.
          </p>
        </div>
      </div>
    </div>
  );
};
