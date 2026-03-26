import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { backendurl } from "../services/apis";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
 
  .signup-wrapper {
    font-family: 'Nunito', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #eef0f7;
  }
 
  .signup-card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 36px;
    width: 320px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.07);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
  .signup-card-icon {
    margin-bottom: 12px;
    color: #5a5fcf;
  }
 
  .signup-card h2 {
    font-size: 22px;
    font-weight: 800;
    color: #1e2060;
    margin-bottom: 20px;
  }
 
  .signup-field-group {
    width: 100%;
    margin-bottom: 16px;
  }
 
  .signup-field-label {
    font-size: 12px;
    font-weight: 700;
    color: #9a9ab0;
    margin-bottom: 6px;
    display: block;
  }
 
  .signup-field-wrap {
    position: relative;
    width: 100%;
    border-bottom: 1.5px solid #e8e8f0;
    display: flex;
    align-items: center;
    transition: border-color 0.2s;
  }
 
  .signup-field-wrap:focus-within {
    border-color: #5a5fcf;
  }
 
  .signup-field-wrap input {
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
 
  .signup-field-icon {
    position: absolute;
    right: 0;
    color: #c5c5d8;
    display: flex;
    align-items: center;
  }
 
  .signup-btn {
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
    margin-top: 8px;
    transition: background 0.2s, transform 0.1s;
  }
 
  .signup-btn:hover { background: #4a4fbf; transform: translateY(-1px); }
  .signup-btn:active { transform: translateY(0); }
 
  .signup-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin: 22px 0 14px;
    color: #c5c5d8;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
  }
 
  .signup-divider::before,
  .signup-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8e8f0;
  }
 
  .signup-social-row {
    display: flex;
    gap: 14px;
    align-items: center;
    justify-content: center;
  }
 
  .signup-social-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: transform 0.15s, opacity 0.15s;
  }
 
  .signup-social-btn:hover { transform: scale(1.1); opacity: 0.85; }
`;

const IconAccount = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5a5fcf"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

const IconMail = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    //     console.log("Signup Data:", formData);
    try {
      const data = await axios.post(
        backendurl + "/api/v1/users/signUp",
        formData,
      );
      navigate("/login");
      //  console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
    }

    // 👉 connect backend API
    // fetch("/api/v1/users/signup", { method: "POST", body: JSON.stringify(formData) })
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-card-icon">
            <IconAccount />
          </div>
          <h2>Create account!</h2>

          <div className="signup-field-group">
            <label className="signup-field-label">Username</label>
            <div className="signup-field-wrap">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your name"
              />
              <span className="signup-field-icon">
                <IconUser />
              </span>
            </div>
          </div>

          <div className="signup-field-group">
            <label className="signup-field-label">E-mail</label>
            <div className="signup-field-wrap">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
              <span className="signup-field-icon">
                <IconMail />
              </span>
            </div>
          </div>

          <div className="signup-field-group">
            <label className="signup-field-label">Password</label>
            <div className="signup-field-wrap">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
              />
              <span className="signup-field-icon">
                <IconLock />
              </span>
            </div>
          </div>

          <button className="signup-btn" onClick={handleSubmit}>
            Create <IconArrow />
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
