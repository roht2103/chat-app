import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
const SignUpComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <section>
          <div>
            <img src={signUpImg} alt="signUp.svg" />
          </div>
          <div className="login-form">
            <h1>Get Started</h1>
            <form>
              <input
                type="text"
                id="displayName"
                placeholder="Display Name"
                required
              />
              <input type="email" id="email" placeholder="email" required />
              <input
                type="password"
                id="pass"
                placeholder="Password"
                required
              />
              <input
                type="password"
                id="confirmPass"
                placeholder="Confirm Password"
                required
              />
              <input type="file" id="avatar" style={{ display: "none" }} />
              <label for="avatar" className="avatar">
                <img src={avatar} alt="avatar.svg" height="40px" />
                <p>Add an Avatar</p>
              </label>
              <input type="submit" id="submit-btn" value="Create Account" />
              <p>
                Already have an Account..?
                <button
                  className="signInBtn"
                  onClick={() => navigate("/login-page")}
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export const SignUp = SignUpComponent;
