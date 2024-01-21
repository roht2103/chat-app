import "./style.scss";
import { Chat } from "./Chat.jsx";
import { DefaultWindow } from "./DefaultWindow.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { useState } from "react";
const HomeComponent = () => {
  const [show, setShow] = useState(false);

  const [isChatWindow, setChatWindow] = useState(false);
  return (
    <div className="container">
      <div className="window">
        <Sidebar show={show} setShow={setShow} setChatWindow={setChatWindow} />
        {isChatWindow ? (
          <Chat setShow={setShow} show={show} />
        ) : (
          <DefaultWindow setShow={setShow} show={show} />
        )}
      </div>
    </div>
  );
};
export const Home = HomeComponent;
