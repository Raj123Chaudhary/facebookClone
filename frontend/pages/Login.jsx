import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { backendurl } from "../services/apis";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
 
  .login-wrapper {
    font-family: 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #eef0f7;
  }
 
  .login-card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 36px;
    width: 320px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.07);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
  .login-card-icon {
    margin-bottom: 12px;
    color: #5a5fcf;
  }
 
  .login-card h2 {
    font-size: 22px;
    font-weight: 800;
    color: #1e2060;
    margin-bottom: 4px;
  }
 
  .login-subtitle {
    font-size: 13px;
    color: #9a9ab0;
    margin-bottom: 24px;
    font-weight: 500;
  }
 
  .login-field-group {
    width: 100%;
    margin-bottom: 16px;
  }
 
  .login-field-label {
    font-size: 12px;
    font-weight: 700;
    color: #9a9ab0;
    margin-bottom: 6px;
    display: block;
  }
 
  .login-field-wrap {
    position: relative;
    width: 100%;
    border-bottom: 1.5px solid #e8e8f0;
    display: flex;
    align-items: center;
    transition: border-color 0.2s;
  }
 
  .login-field-wrap:focus-within {
    border-color: #5a5fcf;
  }
 
  .login-field-wrap input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    color: #1e2060;
    padding: 8px 32px 8px 0;
    font-weight: 600;
  }
 
  .login-field-icon {
    position: absolute;
    right: 0;
    color: #c5c5d8;
    display: flex;
    align-items: center;
  }
 
  .login-field-icon.clickable {
    cursor: pointer;
  }
 
  .login-remember-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 4px;
  }
 
  .login-remember-left {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: #9a9ab0;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
  }
 
  .login-checkbox {
    width: 15px;
    height: 15px;
    border: 1.5px solid #c5c5d8;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;
    background: #fff;
  }
 
  .login-checkbox.checked {
    background: #5a5fcf;
    border-color: #5a5fcf;
  }
 
  .login-checkbox.checked::after {
    content: '';
    display: block;
    width: 4px;
    height: 7px;
    border: 1.5px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) translate(-1px, -1px);
  }
 
  .login-forgot {
    font-size: 12px;
    color: #5a5fcf;
    font-weight: 700;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Nunito', sans-serif;
  }
 
  .login-btn {
    background: #5a5fcf;
    color: #fff;
    border: none;
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-size: 15px;
    font-weight: 800;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.1s;
  }
 
  .login-btn:hover { background: #4a4fbf; transform: translateY(-1px); }
  .login-btn:active { transform: translateY(0); }
`;

const IconLogin = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5a5fcf"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const IconUser = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c5c5d8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconEye = ({ show }) =>
  show ? (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5a5fcf"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c5c5d8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const IconArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    //     console.log("Login Data:", formData);
    try {
      console.log(backendurl + "/api/v1/users/login");
      const data = await axios.post(
        backendurl + "/api/v1/users/login",
        formData,
      );
      console.log(data);
      const token = data.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log("error");
      console.log(error?.response?.data?.message);
    }
    // 👉 connect backend API
    // fetch("/api/v1/users/login", { method: "POST", body: JSON.stringify(formData) })
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-card-icon">
            <IconLogin />
          </div>
          <h2>Welcome!</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <div className="login-field-group">
            <label className="login-field-label">Email</label>
            <div className="login-field-wrap">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
              <span className="login-field-icon">
                <IconUser />
              </span>
            </div>
          </div>

          <div className="login-field-group">
            <label className="login-field-label">Password</label>
            <div className="login-field-wrap">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
              />
              <span
                className="login-field-icon clickable"
                onClick={() => setShowPass(!showPass)}
              >
                <IconEye show={showPass} />
              </span>
            </div>
          </div>

          <button className="login-btn" onClick={handleSubmit}>
            Login <IconArrow />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
