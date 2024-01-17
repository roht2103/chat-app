import "./style.scss";

export const ChatUser = ({ profileUrl, name, lastMsg, onClick }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + " ...";
    }
  };

  const truncatedMsg = truncateText(lastMsg, 20);

  return (
    <div className="userChat" onClick={onClick}>
      <img src={profileUrl} alt="user-img" />
      <div className="userChatInfo">
        <span>{name}</span>
        <p>{truncatedMsg}</p>
      </div>
    </div>
  );
};
