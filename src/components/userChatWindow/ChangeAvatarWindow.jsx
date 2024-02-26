import avatar from "../../assets/avatar.svg";
import cross from "../../assets/cross.svg";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ChangeAvatarWindow = ({
  isChangeAvatarWindow,
  setChangeAvatarWindow,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFile(event.target.result);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const handleSetAvatar = async () => {
    if (!selectedFile) {
      toast.warn("Please select Avatar");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user && selectedFile) {
        const storageRef = ref(storage, user.displayName);
        const uploadTask = uploadBytesResumable(storageRef, file, {
          contentType: selectedFile.type,
        });

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring can be added here if needed
          },
          (error) => {
            console.error("Error uploading file:", error);
            setLoading(false);
          },
          async () => {
            // Upload completed successfully
            try {
              const downloadURL = await getDownloadURL(storageRef);
              let displayName = user.displayName;
              await updateProfile(user, {
                photoURL: downloadURL,
              });
              setLoading(false);
              setChangeAvatarWindow(false);
            } catch (error) {
              console.error("Error updating profile with photo URL:", error);
              setLoading(false);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error setting avatar:", error);
      setLoading(false);
    }
  };

  return (
    <div className="ChangeAvatarWindow">
      <span className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-white">Change Avatar</h1>
        <img
          src={cross}
          alt="cross"
          className="cross"
          onClick={() => setChangeAvatarWindow(false)}
        />
      </span>
      <div className="setAvatar">
        <span className="img">
          <img src={selectedFile ? selectedFile : avatar} alt="" />
        </span>
        <span className="controls">
          <input
            onChange={handleFileChange}
            type="file"
            id="avatar"
            accept="image/*"
          />
          <label htmlFor="avatar">Pick an Avatar</label>
          {isLoading ? (
            <BeatLoader
              style={{
                alignSelf: "center",
                width: "fit-content",
                padding: ".5rem",
              }}
            />
          ) : (
            <button onClick={handleSetAvatar}>Set Avatar</button>
          )}
        </span>
      </div>
    </div>
  );
};
