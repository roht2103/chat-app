import { useNavigate } from "react-router-dom";
import messageicon from "../../assets/message-icon.svg";
const NavComponents = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <span>
          <img src={messageicon} alt="message-icon" height="32px" />
          <h1>ZenChat</h1>
        </span>
        <span className="links">
          <button onClick={() => navigate("login-page")}>Log In</button>
          <button onClick={() => navigate("signUp-page")}>Sign up</button>
        </span>
      </div>
    </>
  );
};
export const Nav = NavComponents;
