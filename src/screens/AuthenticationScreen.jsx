import PropTypes from "prop-types";

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
