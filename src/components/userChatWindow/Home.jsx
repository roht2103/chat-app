import "./style.css";
import { Nav } from "./Nav.jsx";
import { Search } from "./Search.jsx";
import { ChatUser } from "./ChatUser.jsx";
const HomeComponent = () => {
  return (
    <div className="container">
      <div className="window">
        <section className="sidebar">
          <Nav />
          <Search />
          <ChatUser
            profileUrl="https://images.unsplash.com/photo-1610088441520-4352457e7095?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
            name="adam"
          />
          <ChatUser
            profileUrl="https://images.unsplash.com/photo-1488371934083-edb7857977df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
            name="Albert"
          />
          <ChatUser
            profileUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fHww"
            name="George"
          />
        </section>
        <section className="chats">chats</section>
      </div>
    </div>
  );
};
export const Home = HomeComponent;
