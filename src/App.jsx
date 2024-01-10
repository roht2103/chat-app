import "./App.css";
import "./Nav.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { Login } from "./components/login/Login.jsx";
import { SignUp } from "./components/signUp/SignUp.jsx";
import { Home } from "./components/userChatWindow/Home.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoutes = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login-page" />;
    } else {
      return children;
    }
  };

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
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
