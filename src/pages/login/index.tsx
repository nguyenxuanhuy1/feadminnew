import React, { useState } from "react";
import { notification } from "antd";
import { authLogin } from "@/api/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await authLogin({ email, password });

      if (res.status === 200 && res.data) {
        const data = res.data;
        if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        if (data.email) localStorage.setItem("email", data.email);
        if (data.role) localStorage.setItem("role", data.role);

        notification.success({
          message: "Đăng nhập thành công",
        });
        
        window.location.href = "/";
      } else {
        notification.error({
          message: res.data?.message || "Đăng nhập thất bại",
        });
      }
    } catch (error: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="banner-wrapper">
      <img src="/1.png" alt="left" className="banner-left" />
      <div className="banner-stack">
        <img src="/2.png" alt="middle" className="banner-full middle-img" />
        <div className="banner-full bottom-img">
          <div className="top-content">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                <span className="login-text">Đăng nhập</span>
                <img src="/logo.png" alt="logo" className="login-logo" />
              </button>
              <div className="dangKiLink" style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{color:'white'}}>Bạn chưa có tài khoản ? <a style={{color:'white', textDecoration:'underline'}} href="/register">Đăng kí</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
