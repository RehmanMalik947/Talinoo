import React, { useState } from "react";
import "../../assets/css/login.css";
import ApiService from "../../services/ApiService";

function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await ApiService.login({
        username,
        password,
        remember: rememberMe,
      });
      console.log(response);
if (response.user && response.user.type === "admin") {
      alert("Welcome Admin!");
    }
      console.log("Login success:", response);

      // Example: redirect to dashboard after login
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
            <img src="talinoo.svg" alt="Logo" />
          </div>

          {/* title */}
          <div className="welcome-title">
            <h1>Welcome Back</h1>
          </div>

          {/* form */}
          <div className="form-container">
            {/* email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email or UserName
              </label>
              <input
                className="form-input"
                id="email"
                type="text"
                placeholder="Enter your email or username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* RememberMe Checkbox */}
          <div className="checkbox-container">
            <input
              id="remember-me"
              type="checkbox"
              className="checkbox"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="checkbox-label">
              Remember Me
            </label>
          </div>

          <div className="forgot-password">
            <button className="forgot-link">Forgot password?</button>
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* login button */}
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
