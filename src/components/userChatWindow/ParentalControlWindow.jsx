import cross from "../../assets/cross.svg";

export const ParentalControlWindow = ({ setParentalControlWindow }) => {
  return (
    <div className="parentalControlWindow">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Parental Controls</h1>
        <img
          src={cross}
          alt="cross"
          className="cross"
          onClick={() => setParentalControlWindow(false)}
        />
      </span>
      <span>
        <h1>Set limits on chatting</h1>
      </span>
    </div>
  );
};
