import "./Signup.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleSignup } from "../../lib/authLogic";

const Signup = ({ show, setShowLogin, setShowSignup }) => {
  const handleSwitch = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const result = await handleSignup(email, password);
    if (!result.success) {
      setError(result.error);
    } else {
      setError(null);
      console.log("Signup successful", result.data);
    }
  };

  return (
    <>
      {show ? (
        <div className="signup-center">
          <div className="signup-container">
            <button onClick={handleSwitch} className="switch-to-login">
              Switch to Login
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
            ></input>
            <input
              type="password"
              className="confirm-password-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSubmit} className="sign-up-btn">
              Sign Up
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

Signup.propTypes = {
  show: PropTypes.bool,
  setShowLogin: PropTypes.func,
  setShowSignup: PropTypes.func,
};

export default Signup;
