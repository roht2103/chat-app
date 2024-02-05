import "./style.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import { Messages } from "./Messages.jsx";
import { Input } from "./Input.jsx";
import videoIcon from "../../assets/video-solid.svg";
import more from "../../assets/more.svg";
import back from "../../assets/back.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext.jsx";
export const Chat = ({ setShow, messages, setMessages }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className="chat"
      onClick={(e) => {
        if (e.target.tagName === "svg" && e.target.classList.contains("back")) {
          setShow(true);
        } else {
          setShow(false);
        }
      }}
    >
      <div className="chatInfo">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          {/* <img
            height="35px"
            onClick={() => {
              setShow(true);
            }}
            className="back"
            src={back}
            alt="back.svg"
          /> */}
          <IoArrowBackOutline
            onClick={() => {
              setShow(true);
            }}
            className="back"
          />
          <img className="userImg" src={data.user?.photoURL} alt="userImg" />
          <span>
            {data.user?.displayName == currentUser.displayName
              ? currentUser.displayName + " (Me)"
              : data.user?.displayName}
          </span>
        </div>
        <div className="chatIcons">
          <img className="ham" src={videoIcon} alt="videoIcon" />
          <img className="ham" src={more} alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
