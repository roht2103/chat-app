import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import signUpImg from "../../assets/signUp.svg";
import avatar from "../../assets/avatar.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const clickHandeler = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cnfPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password === cnfPassword) {
      if (password.length > 6 || cnfPassword.length > 6) {
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
                console.log("Profile updated and data saved to Firestore");
              } catch (error) {
                console.error(
                  "Error retrieving download URL or updating profile:",
                  error
                );
                setErr(true);
              }

              await setDoc(doc(db, "users", res.user.uid, {}));
            }
          );
        } catch (err) {
          setErr(true);
        }
        navigate("/home");
      } else {
        toast("Password length must greater than 6 Characters!");
      }
    } else {
      toast("Confirm Password dosen't match Password!");
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
              <input type="submit" id="submit-btn" value="Create Account" />
              {err && <span>Something went Wrong...</span>}
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
        <ToastContainer />
      </div>
    </>
  );
};
export const SignUp = SignUpComponent;
