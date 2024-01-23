import "./style.scss";
export const Message = ({ imgSrc, msg }) => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          className="userImg"
          src="https://images.unsplash.com/photo-1610088441520-4352457e7095?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="userImg"
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>
          <img className="inputImg" src={imgSrc} alt="" />
          {msg}
        </p>
      </div>
    </div>
  );
};
