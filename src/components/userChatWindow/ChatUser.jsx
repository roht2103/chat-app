import "./style.css";
export const ChatUser = ({ profileUrl, name }) => {
  console.log(profileUrl, name);
  return (
    <div className="userChat">
      <img src={profileUrl} alt="user-img" />
      <div className="userChatInfo">
        <span>{name}</span>
      </div>
    </div>
  );
};
