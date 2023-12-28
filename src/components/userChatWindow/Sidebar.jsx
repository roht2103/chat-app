import "./style.css";
import { Nav } from "./Nav.jsx";
import { Search } from "./Search.jsx";
import { Chats } from "./Chats.jsx";
export const Sidebar = () => {
  return (
    <section className="sidebar">
      <Nav />
      <Search />
      <Chats />
    </section>
  );
};
