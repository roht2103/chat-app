import "./style.scss";
import img from "../../assets/img.svg";
import send from "../../assets/send.svg";
export const Input = () => {
  const sendMessage = (e) => {
    e.preventDefault();
    alert("hell");
  };
  return (
    <div className="input">
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Type Something..." />
        <div className="send">
          <label htmlFor="file">
            <img src={img} alt="" />
          </label>
          <input id="file" type="file" style={{ display: "none" }} />
          <label htmlFor="send">
            <img src={send} alt="send" />
          </label>
          <input
            id="send"
            type="submit"
            value="Send"
            style={{ display: "none" }}
          />
        </div>
      </form>
    </div>
  );
};
