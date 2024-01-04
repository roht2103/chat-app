import "./style.scss";
import { ChatUser } from "./ChatUser";
export const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input id="search" type="text" placeholder="Find a User" />
      </div>
      <div className="searchedUsers"></div>
    </div>
  );
};
