import "./style.scss";
import { Nav } from "./Nav.jsx";
import { Search } from "./Search.jsx";
import { Chats } from "./Chats.jsx";
export const Sidebar = ({ setChatWindow, setShow, show }) => {
  return (
    <section className={show ? "sidebar active" : "sidebar"}>
      <Nav />
      <Search />
      <Chats setChatWindow={setChatWindow} setShow={setShow} show={show} />
    </section>
  );
};
