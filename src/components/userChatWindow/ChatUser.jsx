import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";

export const ChatUser = ({ profileUrl, name, lastMsg, onClick, time }) => {
  const { currentUser } = useContext(AuthContext);
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    const fetchTimestamp = async () => {
      if (time && time.seconds && time.nanoseconds) {
        const timestampSeconds = time.seconds;
        const timestampNanoseconds = time.nanoseconds;
        const timestampDate = new Date(
          timestampSeconds * 1000 + timestampNanoseconds / 1e6
        );

        const currentDate = new Date();
        const diffInHours = (currentDate - timestampDate) / (1000 * 60 * 60);

        let formattedTimeString;

        if (diffInHours < 24) {
          formattedTimeString = timestampDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        } else if (diffInHours < 48) {
          formattedTimeString = "Yesterday";
        } else {
          formattedTimeString = timestampDate.toLocaleDateString();
        }

        setTimeString(formattedTimeString);
      }
    };

    fetchTimestamp();
  }, [time]);

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
      <div className="userChatInfo" style={{ width: "100%" }}>
        <span>{name == currentUser.displayName ? name + " (Me)" : name}</span>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{truncatedMsg}</p>
          <p>{timeString}</p>
        </span>
      </div>
    </div>
  );
};
