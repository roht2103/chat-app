import { useRef, useState } from "react";
import "./style.css";
export const Nav = () => {
  const menus = ["setting", "log-out"];
  const [open, setOpen] = useState(false);
  const showMenu = () => {
    setOpen(!open);
  };
  const goToMenuItem = (menu) => {
    setOpen(false);
  };
  const menuRef = useRef();
  const hamRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== hamRef.current)
      setOpen(false);
  });
  return (
    <div className="chat-nav">
      <p className="logo">ZenChat</p>
      <span>
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVufGVufDB8fDB8fHww"
            alt="user-img"
          />
          <p className="userName">Attie Patatie</p>
        </div>
        <div className="menu-ham">
          <div ref={hamRef} className="ham" onClick={() => showMenu()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
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
