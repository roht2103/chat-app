import "./style.scss";
import { Chat } from "./Chat.jsx";
import { DefaultWindow } from "./DefaultWindow.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { useState } from "react";
const HomeComponent = () => {
  const [isChatWindow, setChatWindow] = useState(false);
  return (
    <div className="container">
      <div className="window">
        <Sidebar setChatWindow={setChatWindow} />
        {isChatWindow ? <Chat /> : <DefaultWindow />}
      </div>
    </div>
  );
};
export const Home = HomeComponent;
