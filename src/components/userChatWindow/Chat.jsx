import "./style.css";
import videoIcon from "../../assets/video-solid.svg";
import more from "../../assets/more.svg";
export const Chat = () => {
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
          <img
            className="userImg"
            src="https://images.unsplash.com/photo-1610088441520-4352457e7095?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="userImg"
          />
          <span>adam</span>
        </div>
        <div className="chatIcons">
          <img className="ham" src={videoIcon} alt="videoIcon" />
          <img className="ham" src={more} alt="more" />
        </div>
      </div>
    </div>
  );
};
