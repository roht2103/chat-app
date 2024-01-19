import "./style.scss";
import cross from "../../assets/cross.svg";
import imgIcon from "../../assets/img.svg";
import send from "../../assets/send.svg";
import { useState, useContext } from "react";
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
import { doc } from "firebase/firestore";
import { db, storage } from "../../firebase";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

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
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
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
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
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
    setImg(null);
    setText("");
    clearImage();
  };

  return (
    <div className="input">
      <form onSubmit={(e) => sendMessage(e)}>
        {imgPreview && (
          <div className="image-preview">
            <img src={imgPreview} className="Selected" alt="Selected" />
            <button type="button" onClick={clearImage}>
              <img src={cross} height="30px" alt="remove.svg" />
            </button>
          </div>
        )}
        <input
          type="text"
          value={text}
          placeholder={imgPreview ? "Caption (optional)" : "Type Something..."}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="send">
          <label htmlFor="file">
            <img src={imgIcon} alt="" />
          </label>
          <input
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
    </div>
  );
};
