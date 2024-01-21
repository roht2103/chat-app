import icon from "../../assets/message-icon.svg";
export const DefaultWindow = ({ setShow, show }) => {
  return (
    <div
      className="defaultWindow"
      onClick={(e) => {
        if (e.target.tagName !== "P") {
          setShow(false);
        } else {
          setShow(true);
        }
      }}
    >
      <img src={icon} height="10%" alt="" />
      <h1>ZenChat</h1>
      <p>Send and receive messages. Get started now!</p>
      <p
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
        onClick={(e) => setShow(!show)}
      >
        Start a chat!
      </p>
    </div>
  );
};
