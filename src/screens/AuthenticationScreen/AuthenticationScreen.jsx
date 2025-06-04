import PropTypes from "prop-types";

import Login from "../../components/Authentication/Login";

const AuthenticationScreen = ({ showLogin, setShowLogin, auth }) => {
  return (
    <>
      <Login show={showLogin} setShowLogin={setShowLogin} auth={auth} />
    </>
  );
};

AuthenticationScreen.propTypes = {
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
  auth: PropTypes.object,
};

export default AuthenticationScreen;
