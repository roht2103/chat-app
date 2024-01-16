import { useContext, useEffect, useRef } from "react";
import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref}>
      <div
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className="messageInfo">
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
          <p>
            {message.img && (
              <img className="inputImg" src={message.img} alt="" />
            )}
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};
