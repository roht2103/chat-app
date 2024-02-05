import "./style.scss";
import { Nav } from "./Nav.jsx";
import { Search } from "./Search.jsx";
import { Chats } from "./Chats.jsx";
export const Sidebar = ({
  setChatWindow,
  setShow,
  show,
  setSettingWindow,
  isFocusMode,
}) => {
  return (
    <section className={show ? "sidebar active" : "sidebar"}>
      <Nav
        setSettingWindow={setSettingWindow}
        setShow={setShow}
        isFocusMode={isFocusMode}
      />
      <Search />
      <Chats
        setChatWindow={setChatWindow}
        setShow={setShow}
        show={show}
        setSettingWindow={setSettingWindow}
      />
    </section>
  );
};
