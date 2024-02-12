import { useNavigate } from "react-router-dom";
import messageicon from "./assets/message-icon.svg";
import ham from "./assets/ham.svg";
import { useState } from "react";
const NavComponents = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="nav">
        <span>
          <img src={messageicon} alt="message-icon" height="32px" />
          <h1>ZenChat</h1>
        </span>
        <img
          height="30px"
          className="hamMenu"
          src={ham}
          alt="ham.svg"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <div
        className={showSidebar ? "HomeSidebar sidebarActive" : "HomeSidebar"}
      >
        <button
          onClick={() => {
            navigate("login-page");
            setShowSidebar(false);
          }}
        >
          Log In
        </button>
        <button
          onClick={() => {
            navigate("signUp-page");
            setShowSidebar(false);
          }}
        >
          Sign up
        </button>
      </div>
    </>
  );
};
export const Nav = NavComponents;
