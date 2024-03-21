import { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
export const Message = ({ message, isSame }) => {
  let sty;
  sty = isSame ? "hidden" : "visible";
  let margSty = !isSame ? "1rem" : "0rem";
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    const fetchTimestamp = async () => {
      if (message.date && message.date.seconds && message.date.nanoseconds) {
        const timestampSeconds = message.date.seconds;
        const timestampNanoseconds = message.date.nanoseconds;
        const timestampDate = new Date(
          timestampSeconds * 1000 + timestampNanoseconds / 1e6
        );
        const formattedTimeString = timestampDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setTimeString(formattedTimeString);
      }
    };

    fetchTimestamp();
  }, [message.date]);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref}>
      <div
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
        style={{ marginTop: margSty }}
      >
        <div style={{ visibility: sty }} className="messageInfo">
          <img
            className="userImg"
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="userImg"
          />
        </div>
        <div className="messageContent">
          <p style={{ display: "flex", flexDirection: "column" }}>
            {message.img && (
              <img className="inputImg h-36 " src={message.img} alt="" />
            )}
            <span style={{ marginRight: "2rem" }}>{message.text}</span>
            <i
              style={{
                fontSize: ".8rem",
                padding: "0px",
                border: "0px",
                textAlign: "right",
                color: "gray",
              }}
            >
              {timeString}
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};
