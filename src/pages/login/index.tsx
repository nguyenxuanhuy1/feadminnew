import LinkApi from "@/Hook/LinkApi";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(LinkApi.Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Đăng nhập thất bại");
      }
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data.email) {
        localStorage.setItem("email", data.email);
      }
      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      console.log("Đăng nhập thành công:", data);
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      alert((error as Error).message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="banner-wrapper">
      <img src="/1.png" alt="left" className="banner-left" />
      <div className="banner-stack">
        <img src="/2.png" alt="middle" className="banner-full middle-img" />
        <div className="banner-full bottom-img">
          <div className="bottom-content">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="nhập email"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="nhập mật khẩu"
                  required
                />
              </div>
            </form>

            <button className="login-button" onClick={handleSubmit}>
              <span className="login-text">Đăng nhập</span>
              <img src="/logo.png" alt="logo" className="login-logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// ...existing code...