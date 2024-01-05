import { useContext, useRef, useState } from "react";
import more from "../../assets/more.svg";
import "./style.scss";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
export const Nav = () => {
  const menus = ["setting", "log-out"];
  const [open, setOpen] = useState(false);
  const showMenu = () => {
    setOpen(!open);
  };
  const goToMenuItem = (menu) => {
    setOpen(false);
    console.log(menu);
    menu == "log-out" ? signOut(auth) : true;
  };
  const menuRef = useRef();
  const hamRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== hamRef.current)
      setOpen(false);
  });

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="chat-nav">
      <p className="logo">ZenChat</p>
      <span>
        <div>
          <img className="userImg" src={currentUser.photoURL} alt="user-img" />
          <p className="userName">{currentUser.displayName}</p>
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
