import React, { useState } from "react";
import { notification } from "antd";
import { authRegister } from "@/api/auth";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const usernameRegex = /^[\x00-\x7F]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fullName.length > 50) {
      notification.error({
        message: "Lỗi nhập liệu",
        description: "Họ và tên không được vượt quá 50 ký tự",
      });
      return;
    }

    if (email.length > 50) {
      notification.error({
        message: "Lỗi nhập liệu",
        description: "Tài khoản (email) không được vượt quá 50 ký tự",
      });
      return;
    }

    if (!usernameRegex.test(email)) {
      notification.error({
        message: "Lỗi nhập liệu",
        description: "Tài khoản không được chứa dấu cách hoặc ký tự tiếng Việt",
      });
      return;
    }

    if (password.length > 20) {
      notification.error({
        message: "Lỗi nhập liệu",
        description: "Mật khẩu không được vượt quá 20 ký tự",
      });
      return;
    }

    if (!usernameRegex.test(password)) {
      notification.error({
        message: "Lỗi nhập liệu",
        description: "Mật khẩu không được chứa dấu cách hoặc ký tự tiếng Việt",
      });
      return;
    }

    try {
      const res = await authRegister({ email, password, fullName });

      if (res.status === 200) {
        notification.success({
          message: "Thành công",
          description: res.data.message || "Đăng ký thành công",
        });
        window.location.href = "/login";
      } else {
        notification.error({
          message: "Thất bại",
          description: res.data?.message || "Đăng ký thất bại",
        });
      }
    } catch (error: any) {
      notification.error({
        message: "Lỗi!",
        description:
          error.response?.data?.message || error.message || "Đăng ký thất bại",
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
              <div
                className="form-row"
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Đăng ký tài khoản
              </div>

              <div className="form-row">
                <label htmlFor="fullName" className="form-label">
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder="Nhập họ và tên"
                  required
                  maxLength={50}
                />
              </div>

              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  Tài khoản
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Nhập tài khoản"
                  required
                  maxLength={50}
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
                  maxLength={20}
                />
              </div>

              <button type="submit" className="login-button">
                <span className="login-text">Đăng ký</span>
              </button>

              <div
                className="dangKiLink"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ color: "white" }}>
                  Bạn đã có tài khoản?{" "}
                  <a
                    style={{ color: "white", textDecoration: "underline" }}
                    href="/login"
                  >
                    Đăng nhập
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
