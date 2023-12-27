import { useNavigate } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <section>
          <div>
            <img src={signUpImg} alt="signUp.svg" />
          </div>
          <div className="login-form">
            <h1>Log in</h1>
            <form>
              <input type="email" id="email" placeholder="email" required />
              <input
                type="password"
                id="pass"
                placeholder="Password"
                required
              />
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
