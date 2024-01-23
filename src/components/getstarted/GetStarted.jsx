// import "./Nav.css";
// GetStarted.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Nav } from "../../Nav.jsx";
import { Login } from "../login/Login.jsx";
import { SignUp } from "../signUp/SignUp.jsx";
import { Home } from "../userChatWindow/Home.jsx";
import { useContext } from "react";

const GetStartedComponent = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        {/* Route with Nav */}
        <Route
          path="/*"
          element={
            <>
              <Nav />
              <Routes>
                <Route path="login-page" element={<Login />} />
                <Route path="/signup-page" element={<SignUp />} />

                {/* Other routes with Nav */}
              </Routes>
            </>
          }
        />

        {/* Route without Nav */}
        <Route path="/login-page" element={<Login />} />
        <Route path="/signup-page" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export const GetStarted = GetStartedComponent;
