import PropTypes from "prop-types";

import Login from "../../components/Authentication/Login";

const AuthenticationScreen = ({ showLogin, setShowLogin, setAuth }) => {
  return (
    <>
      <Login show={showLogin} setShowLogin={setShowLogin} setAuth={setAuth} />
    </>
  );
};

AuthenticationScreen.propTypes = {
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
  setAuth: PropTypes.func,
};

export default AuthenticationScreen;
