import icon from "../../assets/message-icon.svg";
export const DefaultWindow = () => {
  return (
    <div className="defaultWindow">
      <img src={icon} height="10%" alt="" />
      <h1>ZenChat</h1>
      <p>Send and receive messages. Get started now!</p>
    </div>
  );
};
