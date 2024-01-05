import { useNavigate } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
import eye from "../../assets/eye.svg";
import eyeclose from "../../assets/eye-close.svg";
import { useState } from "react";
const LoginComponent = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const submitHandeler = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <>
      <div className="body">
        <section>
          <div>
            <img src={signUpImg} alt="signUp.svg" />
          </div>
          <div className="login-form">
            <h1>Log in</h1>
            <form onSubmit={submitHandeler}>
              <input type="email" id="email" placeholder="email" required />
              <div className="inputPass">
                <input
                  type={showPass ? "text" : "password"}
                  id="pass"
                  placeholder="Password"
                  required
                />
                <img
                  onClick={() => setShowPass(!showPass)}
                  style={{ margin: ".5rem", cursor: "pointer" }}
                  height="50%"
                  src={showPass ? eyeclose : eye}
                  alt={showPass ? eyeclose : eye}
                />
              </div>
              <input type="submit" id="submit-btn" value="Log In" />
              <p>
                Don't have an Account..?
                <button
                  className="signInBtn"
                  onClick={() => navigate("/signUp-page")}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export const Login = LoginComponent;
