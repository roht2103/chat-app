import { IoArrowBackOutline } from "react-icons/io5";

export const SettingWindow = ({ setShow, setSettingWindow }) => {
  return (
    <div className="settingWindow" onClick={() => setShow(false)}>
      <header>
        <IoArrowBackOutline
          style={{
            width: "35px",
            height: "35px",
            marginRight: "10px",
            cursor: "pointer",
            padding: "2px",
          }}
          className="backSetting"
          onClick={() => setSettingWindow(false)}
        />
        <h1>Settings</h1>
      </header>
    </div>
  );
};
