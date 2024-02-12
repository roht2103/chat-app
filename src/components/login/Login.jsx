import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
import eye from "../../assets/eye.svg";
import eyeclose from "../../assets/eye-close.svg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import BeatLoader from "react-spinners/BeatLoader";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const submitHandeler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (password.length > 6) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
        setLoading(false);
      } catch (err) {
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          setLoading(false);
          toast.error(err.code, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setErr(true);
          // toast.error(err);
        } else {
        }
      }
    } else {
      toast.warn("Password length must greater than 6 Characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div className="cont">
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
              {isLoading ? (
                <BeatLoader
                  color="#b473d7"
                  style={{
                    alignSelf: "center",
                    width: "fit-content",
                    padding: "0.7rem 1rem",
                  }}
                />
              ) : (
                <input type="submit" id="submit-btn" value="Log In" />
              )}
              {/* {err && (
                <span style={{ textAlign: "center", color: "red" }}>
                  Something went Wrong...
                </span>
              )} */}
              <p>
                Don't have an Account..?
                <button
                  className="signInBtn"
                  onClick={() => navigate("/signUp-page")}
                >
                  Sign Up
                </button>
              </p>
              <Link className="link" to="/">
                Go Back
              </Link>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export const Login = LoginComponent;
