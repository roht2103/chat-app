import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
import eye from "../../assets/eye.svg";
import eyeclose from "../../assets/eye-close.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState, CSSProperties } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
const SignUpComponent = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCnfPass, setShowCnfPass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const clickHandeler = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cnfPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password === cnfPassword) {
      if (password.length > 6 || cnfPassword.length > 6) {
        setLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const storageRef = ref(storage, displayName);

          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Do nothing for progress events
            },
            (error) => {
              console.error("Error uploading file:", error);
              setErr(true);
            },
            async () => {
              console.log("Upload completed successfully");
              try {
                const downloadURL = await getDownloadURL(storageRef);
                console.log("Download URL:", downloadURL);

                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
                console.log("Profile updated and data saved to Firestore");

                navigate("/home");
                setLoading(false);
                toast.success("Welcome " + displayName + "!", {
                  position: "top-right",
                  autoClose: 5000,
                  color: "#b473d7",
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } catch (error) {
                console.error(
                  "Error retrieving download URL or updating profile:",
                  error
                );
                setErr(true);
              }
            }
          );
        } catch (err) {
          setErr(true);
        }
      } else {
        toast("Password length must be greater than 6 Characters!");
      }
    } else {
      toast("Confirm Password doesn't match Password!");
    }
  };
  return (
    <>
      <div className="body">
        <section>
          <div>
            <img src={signUpImg} alt="signUp.svg" />
          </div>
          <div className="login-form">
            <h1>Get Started</h1>
            <form onSubmit={clickHandeler}>
              <input
                type="text"
                id="displayName"
                placeholder="Display Name"
                required
              />
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
              <div className="inputPass">
                <input
                  type={showCnfPass ? "text" : "password"}
                  id="confirmPass"
                  placeholder="Confirm Password"
                  required
                />
                <img
                  onClick={() => setShowCnfPass(!showCnfPass)}
                  style={{ margin: ".5rem", cursor: "pointer" }}
                  height="50%"
                  src={showCnfPass ? eyeclose : eye}
                  alt={showCnfPass ? eyeclose : eye}
                />
              </div>
              <input
                name="file"
                type="file"
                id="avatar"
                style={{ display: "none" }}
                required
              />
              <label htmlFor="avatar" className="avatar">
                <img src={avatar} alt="avatar.svg" height="40px" />
                <p>Add an Avatar</p>
              </label>
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
                <input type="submit" id="submit-btn" value="Create Account" />
              )}
              {err && (
                <span style={{ textAlign: "center", color: "red" }}>
                  Something went Wrong...
                </span>
              )}
              <p>
                Already have an Account..?
                <button
                  className="signInBtn"
                  onClick={() => navigate("/login-page")}
                >
                  Sign In
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
export const SignUp = SignUpComponent;
