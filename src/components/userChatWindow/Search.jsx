import "./style.css";
import { ChatUser } from "./ChatUser";
export const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a User" />
      </div>
      <div className="searchedUsers"></div>
    </div>
  );
};
