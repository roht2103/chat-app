import { useContext, useRef, useState } from "react";
import more from "../../assets/more.svg";
import focus from "../../assets/focus.svg";
import "./style.scss";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
export const Nav = ({ setSettingWindow, setShow, isFocusMode }) => {
  const menus = ["setting", "log-out"];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showMenu = () => {
    setOpen(!open);
  };
  const goToMenuItem = (menu) => {
    setOpen(false);
    menu == "log-out" ? handleLogout() : true;
    menu == "setting" ? (setSettingWindow(true), setShow(false)) : true;
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to the App component ("/" route)
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, show message, etc.
    }
  };
  const menuRef = useRef();
  const hamRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== hamRef.current)
      setOpen(false);
  });

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="chat-nav">
      <p className="logo">ZenChat</p>
      <span>
        <div className="user-container">
          <div className="user-info">
            <img
              className="userImg"
              src={currentUser.photoURL}
              alt="user-img"
            />
            <p className="userName">{currentUser.displayName}</p>
          </div>

          {isFocusMode && (
            <div className="focus-indicator">
              <img src={focus} alt="focus.svg" />
            </div>
          )}
        </div>

        <div className="menu-ham">
          <img
            ref={hamRef}
            className="ham"
            onClick={() => showMenu()}
            src={more}
            alt="more"
          />
          {open && (
            <ul ref={menuRef} className="menu">
              {menus.map((menu) => (
                <li onClick={() => goToMenuItem(menu)} key={menu}>
                  {menu}
                </li>
              ))}
            </ul>
          )}
        </div>
      </span>
    </div>
  );
};
