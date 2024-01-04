import "./style.scss";
import { Chat } from "./Chat.jsx";
import { Sidebar } from "./Sidebar.jsx";
const HomeComponent = () => {
  return (
    <div className="container">
      <div className="window">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
export const Home = HomeComponent;
