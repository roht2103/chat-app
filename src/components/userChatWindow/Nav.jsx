import "./style.css";
export const Nav = () => {
  return (
    <div className="chat-nav">
      <p className="logo">ZenChat</p>
      <span>
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVufGVufDB8fDB8fHww"
            alt="user-img"
          />
          <p className="userName">Attie Patatie</p>
        </div>
        <div>
          <input id="log-out-btn" type="button" value="Log Out" />
          <div className="ham">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </span>
    </div>
  );
};
