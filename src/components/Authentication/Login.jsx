import "./Login.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleLogin } from "../../lib/authLogic";

const Login = ({ show, setShowLogin, setShowSignup, auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const result = await handleLogin(email, password);
    if (!result.success) {
      setShowError(true);
    } else {
      setShowError(false);
      setShowLogin(false);
      console.log("Login successful", result.data);
      auth.user = result.data.user;
      auth.session = result.data.session;

      localStorage.setItem("auth-info", JSON.stringify(auth));
      console.log("Saved auth to local storage:", JSON.stringify(auth));
    }
  };

  const handleSwitch = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const [showError, setShowError] = useState(false);

  return (
    <>
      {show ? (
        <div className="login-center">
          <div className="login-container">
            <button onClick={handleSwitch} className="switch-to-sign-up">
              Switch to Sign Up
            </button>
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
            {showError && (
              <p className="error-message">
                We&apos;ve encountered an error logging you in. Please try
                again.
              </p>
            )}
            <button onClick={handleSubmit} className="sign-in-btn">
              Sign In
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
  setShowSignup: PropTypes.func,
  auth: PropTypes.object,
};

export default Login;
