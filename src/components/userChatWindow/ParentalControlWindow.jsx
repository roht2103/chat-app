import { useState, useEffect } from "react";
import cross from "../../assets/cross.svg";
import crossWhite from "../../assets/cross-white.svg";
import eye from "../../assets/eye.svg";
import eyeClose from "../../assets/eye-close.svg";
import { Switch } from "antd";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ParentalControlWindow = ({ setParentalControlWindow }) => {
  const [isLimits, setLimits] = useState(false);
  const [authanticate, setAuthenticate] = useState(false);
  const [isNewToPControls, setNewToPControls] = useState(true);
  const [typePass, setTypePass] = useState(true);
  const [pass, setPass] = useState("");
  const [isParentKey, setParentKey] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [showSetLimit, setShowSetLimit] = useState(false);

  const handleSwitchChange = () => {
    setAuthenticate(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(db, "users", userId);

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setLimits(userData.isLimits || false);
            setNewToPControls(userData.isNewToPControls || true);
            setParentKey(userData.parentKey || "");
            setIsTimeSet(userData.isTimeSet || false);
            setLimitTime(userData.limitTime || 0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the password
    if (!isParentKey) {
      // If parent key is not set, validate the new key
      if (!isStrongPassword(pass)) {
        toast.error(
          "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters"
        );
        return;
      }
      setAuthenticate(false);
      setParentKey(pass);
    } else {
      // If parent key is set, validate the entered key
      if (pass !== isParentKey) {
        toast.error("Entered password is incorrect");
        return;
      }
      setAuthenticate(false);
      setLimits(!isLimits);
      setNewToPControls(false);
      setShowSetLimit(true);
    }

    // Update Firestore with the new values
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        await updateDoc(userRef, {
          isLimits: !isLimits,
          isNewToPControls: false,
          parentKey: pass,
        });
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };
  const updateDocument = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        await updateDoc(userRef, {
          limitTime: limitTime,
          isTimeSet: true,
          chatDuration: 0,
        });
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
    setShowSetLimit(false);
  };

  // Password strength validation using regular expression
  const isStrongPassword = (password) => {
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordPattern.test(password);
  };

  return (
    <div className="parentalControlWindow min-h-80">
      <span className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-[#b473d7]">Parental Controls</h1>
        <img
          src={cross}
          alt="cross"
          className="cross"
          onClick={() => setParentalControlWindow(false)}
        />
      </span>
      <span className="transition hover:bg-[#adbbd3] p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-gray-600">Set limits on chatting</h1>
          <Switch checked={isLimits} onChange={handleSwitchChange} />
        </div>
        {authanticate && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="pt-5 text-2xl text-white-700 absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="bg-[#253248] p-4 rounded-lg flex flex-col gap-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
              <img
                onClick={() => setAuthenticate(false)}
                src={crossWhite}
                height="30px"
                width="30px"
                style={{ color: "white" }}
                className="cursor-pointer h-6 self-end"
                alt=""
              />
              <label className="mt-2" htmlFor="pass">
                {isNewToPControls && !isParentKey
                  ? "Create a Security Key:"
                  : "Enter Security Key:"}
              </label>
              <span className="bg-white rounded-md p-1 flex align-center justify-between ">
                <input
                  onChange={(e) => setPass(e.target.value)}
                  className={`outline-none border-0 rounded-md text-gray-600 p-2 text-2xl ${
                    !isStrongPassword(pass) && pass !== ""
                      ? "border-red-500"
                      : ""
                  }`}
                  type={typePass ? "password" : "text"}
                  id="pass"
                  required
                />
                <img
                  onClick={() => setTypePass(!typePass)}
                  className="w-7 cursor-pointer mr-1"
                  src={typePass ? eye : eyeClose}
                  alt="eye"
                />
              </span>
              <input
                className="cursor-pointer w-28 rounded-md border-0 text-xl self-center p-2 text-center text-[#b473d7]"
                type="submit"
                value={
                  !isParentKey
                    ? "Create"
                    : isLimits && isParentKey
                    ? "Turn Off"
                    : "Turn On"
                }
              />
            </span>
          </form>
        )}
        {isLimits && showSetLimit && (
          <form
            className="mt-3 flex flex-col w-fit gap-2"
            onSubmit={(e) => updateDocument(e)}
          >
            <label className="text-black text-xl" htmlFor="time">
              Set Limit Time (in hours):
            </label>
            <input
              className="w-full pt-1 pb-1 pl-3 pr-3 outline-none rounded-md border-0 text-xl"
              type="number"
              value={limitTime}
              min={0.01}
              max={24}
              id="time"
              onChange={(e) => setLimitTime(e.target.value)}
            />
            <input
              className="w-20 pt-1 pb-1 pl-3 pr-3 outline-none rounded-md border-0 text-2xl cursor-pointer text-[#b473d7] hover:bg-[#4e5e79] font-bold transition"
              type="submit"
              value="set"
            />
          </form>
        )}
      </span>
    </div>
  );
};
