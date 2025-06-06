import PropTypes from "prop-types";

import Login from "../../components/Authentication/Login";

const AuthenticationScreen = ({ setScreen, setAuth }) => {
  return (
    <>
      <Login setScreen={setScreen} setAuth={setAuth} />
    </>
  );
};

AuthenticationScreen.propTypes = {
  setScreen: PropTypes.func,
  setAuth: PropTypes.func,
};

export default AuthenticationScreen;
