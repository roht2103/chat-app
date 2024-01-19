import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const ChatUser = ({ profileUrl, name, lastMsg, onClick }) => {
  const { currentUser } = useContext(AuthContext);
  // console.log("currentuser: ", currentUser.displayName);
  let truncatedMsg;
  if (lastMsg) {
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + " ...";
      }
    };

    truncatedMsg = truncateText(lastMsg, 20);
  } else {
    truncatedMsg = "📷 image";
  }

  return (
    <div className="userChat" onClick={onClick}>
      <img src={profileUrl} alt="user-img" />
      <div className="userChatInfo">
        <span>{name == currentUser.displayName ? name + " (Me)" : name}</span>
        <p>{truncatedMsg}</p>
      </div>
    </div>
  );
};
