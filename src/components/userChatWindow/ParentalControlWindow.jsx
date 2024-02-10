import { useState } from "react";
import cross from "../../assets/cross.svg";
import crossWhite from "../../assets/cross-white.svg";
import eye from "../../assets/eye.svg";
import eyeClose from "../../assets/eye-close.svg";
import { Switch } from "antd";
export const ParentalControlWindow = ({ setParentalControlWindow }) => {
  const [isLimits, setLimits] = useState(false);
  const [authanticate, setAuthenticate] = useState(false);
  const [isNewToPControls, setNewToPControls] = useState(true);
  const [typePass, setTypePass] = useState(true);
  const [pass, setPass] = useState("");
  const handleSwitchChange = () => {
    setAuthenticate(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthenticate(false);
    setLimits(!isLimits);
    setNewToPControls(false);
  };
  return (
    <div className="parentalControlWindow min-h-80">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-3xl font-bold mb-5 text-[#b473d7]">
          Parental Controls
        </h1>
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
            <span className="bg-[#253248] p-4 rounded-lg flex flex-col gap-2">
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
                {isNewToPControls
                  ? "Create a Security Key:"
                  : "Enter Security Key:"}
              </label>
              <span className="bg-white rounded-md p-1 flex align-center justify-between ">
                <input
                  onChange={(e) => setPass(e.target.value)}
                  className="outline-none border-0 rounded-md text-gray-600 p-2 text-2xl"
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
                className="cursor-pointer w-auto rounded-md border-0 text-xl self-center p-2 text-center text-[#b473d7]"
                type="submit"
                value={
                  isNewToPControls
                    ? "Create"
                    : isLimits
                    ? "Turn Off"
                    : "Turn On"
                }
              />
            </span>
          </form>
        )}
      </span>
    </div>
  );
};
