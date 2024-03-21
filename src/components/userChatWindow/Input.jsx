import "./style.scss";
import cross from "../../assets/cross.svg";
import imgIcon from "../../assets/img.svg";
import send from "../../assets/send.svg";
import { useState, useContext, useEffect } from "react";
import { MdBackspace } from "react-icons/md";
import Sentiment from "sentiment";
import {
  Timestamp,
  arrayUnion,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage, auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { CiTimer } from "react-icons/ci";
import { message } from "antd";

export const Input = ({
  exceeded,
  setExceeded,
  isMessageScheduling,
  setShowTimePicker,
  isTimePicker,
  isScheduled,
  setScheduled,
  date,
  setDate,
  setTime,
  time,
}) => {
  const sentiment = new Sentiment();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [isFocusMode, setFocusMode] = useState(false);
  const [limitTime, setLimitTime] = useState(0);
  const [isLimits, setLimits] = useState(false);
  const [chatDuration, setChatDuration] = useState(0);

  useEffect(() => {
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
            setLimits(userData.isLimits || false);
            setLimitTime(userData.limitTime || 0);
            setChatDuration(userData.chatDuration || 0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);
  !text && setShowTimePicker(false);
  useEffect(() => {
    const interval = setInterval(() => {
      // Update chat duration only if isLimits is true
      if (!isFocusMode && isLimits && chatDuration <= limitTime * 3600) {
        setChatDuration((prevDuration) => prevDuration + 1);
      }
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [isLimits, chatDuration]);

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
    // console.log(storedDay);
    // console.log(today);
    if (today !== storedDay) {
      const updateDocument = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = doc(db, "users", userId);

          try {
            await updateDoc(userRef, {
              chatDuration: 0,
            });
          } catch (error) {
            console.error("Error updating Firestore:", error);
          }
        }
      };
      updateDocument();
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
        // console.log(chatDuration);
      } catch (error) {
        console.error("Error updating chat duration in database:", error);
      }
    }
  };

  useEffect(() => {
    if (isLimits && chatDuration > limitTime * 3600) {
      setExceeded(true);
      toast.warn(
        "Sorry, you've reached the time limit for chatting. Come back tommorrow."
      );
    }
  }, [isLimits, chatDuration]);

  const handleImageChange = (e) => {
    const selectedImg = e.target.files[0];
    setImg(selectedImg);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(selectedImg);
  };

  const clearImage = () => {
    setImg(null);
    setImgPreview(null);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress event if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        async () => {
          console.log("Upload completed successfully");
          try {
            const downloadURL = await getDownloadURL(storageRef);
            console.log(downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
                isScheduled: isScheduled,
                scheDuledDate: date,
                ScehduledTime: time,
              }),
            });
          } catch (error) {
            console.error(
              "Error retrieving download URL or updating profile:",
              error
            );
          }
        }
      );
    } else {
      const result = sentiment.analyze(text);
      if (result.score < -3) {
        toast.error("Offensive words detected!");
        console.log(result.score);
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            isScheduled: isScheduled,
            scheduledDate: date,
            scheduledTime: time,
          }),
        });
        if (!isScheduled) {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        }
      }
    }
    setImg(null);
    setText("");
    clearImage();
    setShowTimePicker(false);
    setTime("");
    setDate("");
    setScheduled(false);
  };

  return (
    <div
      className="input"
      title={isFocusMode ? "You cant send messages as Focus mode is on" : ""}
    >
      <form onSubmit={(e) => sendMessage(e)}>
        {imgPreview && (
          <div className="image-preview">
            <img src={imgPreview} className="Selected" alt="Selected" />
            {/* <button type="button" onClick={clearImage}>
              <img src={cross} height="30px" alt="remove.svg" />
            </button> */}
            <MdBackspace
              onClick={clearImage}
              height="30px"
              className="clearImg"
            />
          </div>
        )}

        <input
          disabled={isFocusMode || exceeded}
          type="text"
          value={exceeded ? "" : text}
          placeholder={
            imgPreview
              ? "Caption (optional)"
              : isFocusMode
              ? "You cant send messages as Focus mode is on"
              : exceeded
              ? "You've reached the time limit for chatting!"
              : "Type Something..."
          }
          onChange={(e) => setText(e.target.value)}
        />
        <div className="send">
          {isMessageScheduling && (text || imgPreview) && (
            <CiTimer
              title="Schedule Message"
              className="w-8 h-8 cursor-pointer "
              onClick={() => setShowTimePicker(!isTimePicker)}
            />
          )}
          <label htmlFor="file">
            <img src={imgIcon} alt="" />
          </label>
          <input
            disabled={isFocusMode || exceeded}
            id="file"
            type="file"
            onChange={(e) => handleImageChange(e)}
            style={{ display: "none" }}
          />
          <label htmlFor="send">
            <img src={send} alt="send" />
          </label>
          <input
            id="send"
            type="submit"
            value="Send"
            style={{ display: "none" }}
            disabled={!text && !img}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
