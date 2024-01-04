import "./style.scss";
export const ChatUser = ({ profileUrl, name, lastMsg }) => {
  return (
    <div className="userChat">
      <img src={profileUrl} alt="user-img" />
      <div className="userChatInfo">
        <span>{name}</span>
        <p>{lastMsg}</p>
      </div>
    </div>
  );
};
