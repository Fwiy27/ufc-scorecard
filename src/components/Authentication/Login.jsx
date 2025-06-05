import "./Login.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleLogin, handleSignup } from "../../lib/authLogic";

const Login = ({ show, setShowLogin, setAuth }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmitLogin = async () => {
    const result = await handleLogin(email, password);
    if (!result.success) {
      setError(result.error);
      setShowLogin(true);
    } else {
      setError(null);
      setShowLogin(false);
      console.log("Login successful", result.data);
      setAuth(result.data);

      localStorage.setItem("auth-info", JSON.stringify(result.data));
      console.log("Saved auth to local storage:", JSON.stringify(result.data));
    }
  };

  const handleSubmitSignup = async () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const result = await handleSignup(email, password);
    if (!result.success) {
      setError(result.error);
    } else {
      setError(null);
      handleSwitch();
      console.log("Signup successful", result.data);
    }
  };

  const handleSubmit = () => {
    if (mode === "login") {
      handleSubmitLogin();
    } else {
      handleSubmitSignup();
    }
  };

  const handleSwitch = () => {
    if (mode === "login") {
      setMode("signup");
    } else {
      setMode("login");
    }
  };

  return (
    <>
      {show ? (
        <div className="login-center">
          <div className="login-container">
            <button onClick={handleSwitch} className="switch">
              Switch to {mode === "login" ? "Sign Up" : "Login"}
            </button>
            <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>
            <input
              type="text"
              className="email-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="password-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            ></input>
            {mode === "signup" ? (
              <input
                type="password"
                className="password-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              ></input>
            ) : null}
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSubmit} className="submit-btn">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

Login.propTypes = {
  show: PropTypes.bool,
  setShowLogin: PropTypes.func,
  auth: PropTypes.object,
};

export default Login;
