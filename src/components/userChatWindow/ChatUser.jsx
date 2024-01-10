import "./style.scss";

export const ChatUser = ({ profileUrl, name, lastMsg, onClick }) => {
  return (
    <div className="userChat" onClick={onClick}>
      <img src={profileUrl} alt="user-img" />
      <div className="userChatInfo">
        <span>{name}</span>
        <p>{lastMsg}</p>
      </div>
    </div>
  );
};
