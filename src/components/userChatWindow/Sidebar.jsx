import "./style.scss";
import { Nav } from "./Nav.jsx";
import { Search } from "./Search.jsx";
import { Chats } from "./Chats.jsx";
export const Sidebar = ({ setChatWindow }) => {
  return (
    <section className="sidebar">
      <Nav />
      <Search />
      <Chats setChatWindow={setChatWindow} />
    </section>
  );
};
