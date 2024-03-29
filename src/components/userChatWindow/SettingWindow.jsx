import { IoArrowBackOutline } from "react-icons/io5";
import { Switch } from "antd";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

export const SettingWindow = ({
  setShow,
  setSettingWindow,
  isChangeAvatarWindow,
  setChangeAvatarWindow,
  isParentalControlWindow,
  setParentalControlWindow,
  isMessageScheduling,
  setMessageScheduling,
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
    checked
      ? toast.success("Focus mode activated!")
      : toast.warn("Focus mode deactivated!");
  };
  const handleMessageSceduling = async (checked) => {
    setMessageScheduling(checked);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        await updateDoc(userRef, {
          isMessageScheduling: checked,
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    checked
      ? toast.success("Scheduled Messaging activated!")
      : toast.warn("Scheduled Messaging deactivated!");
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
          onClick={() => setChangeAvatarWindow(true)}
        >
          <span>
            <h3>Change Avatar</h3>
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
            setParentalControlWindow(true);
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
        <div className="setting">
          <span>
            <h3>Message Scheduling</h3>
            <Switch
              checked={isMessageScheduling}
              onChange={handleMessageSceduling}
            />
          </span>
          <p>
            By turning on the Message Scheduling, you will be able to schedule
            mesaage for specific time .
          </p>
        </div>
      </div>
    </div>
  );
};
