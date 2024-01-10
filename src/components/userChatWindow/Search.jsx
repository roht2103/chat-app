import "./style.scss";
import { ChatUser } from "./ChatUser";
import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
export const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handelkey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] }); // <-- Added 'db' here

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error handling selection:", err);
    }
    setUser(null);
    setUserName("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          id="search"
          type="text"
          placeholder="Find a User"
          onKeyDown={handelkey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>{err.code}</span>}
      {user && (
        <div
          onClick={handleSelect}
          className="searchedUsers"
          style={{ borderBottom: "2px solid #253248" }}
        >
          <ChatUser
            onClick={handleSelect}
            profileUrl={user.photoURL}
            name={user.displayName}
          />
        </div>
      )}
    </div>
  );
};
