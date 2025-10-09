const Login = () => {
  return (
    <div className="banner-wrapper">
      <img src="/1.png" alt="left" className="banner-left" />
      <div className="banner-stack">
        <img src="/2.png" alt="middle" className="banner-full middle-img" />
        <div className="banner-full bottom-img">
          <div className="bottom-content">
            {/* <img src="/text.png" alt="text" className="bottom-text" /> */}
            <button className="login-button" >
              <span className="login-text">
                Đăng nhập 
               
              </span>
              <img src="/logo.png" alt="logo" className="login-logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
