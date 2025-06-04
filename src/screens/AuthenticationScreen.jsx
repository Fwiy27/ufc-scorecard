import PropTypes from "prop-types";

import Signup from "../components/Authentication/SignUp";
import Login from "../components/Authentication/Login";

const AuthenticationScreen = ({
  showLogin,
  setShowLogin,
  showSignup,
  setShowSignup,
  auth,
}) => {
  return (
    <>
      <Login
        show={showLogin}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        auth={auth}
      />
      <Signup
        show={showSignup}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />
    </>
  );
};

AuthenticationScreen.propTypes = {
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
  showSignup: PropTypes.bool,
  setShowSignup: PropTypes.func,
  auth: PropTypes.object,
};

export default AuthenticationScreen;
