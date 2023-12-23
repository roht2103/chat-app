import { useNavigate } from "react-router-dom";
const NavComponents = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <span>
          <h1>logo</h1>
        </span>
        <span className="links">
          <button onClick={() => navigate("login-page")}>Log In</button>
          <button>Sign up</button>
        </span>
      </div>
    </>
  );
};
export const Nav = NavComponents;
