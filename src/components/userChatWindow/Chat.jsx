import "./style.scss";
import { Messages } from "./Messages.jsx";
import { Input } from "./Input.jsx";
import videoIcon from "../../assets/video-solid.svg";
import more from "../../assets/more.svg";
import back from "../../assets/back.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext.jsx";
export const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <img height="35px" className="back" src={back} alt="back.svg" />
          <img className="userImg" src={data.user?.photoURL} alt="userImg" />
          <span>{data.user?.displayName}</span>
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
