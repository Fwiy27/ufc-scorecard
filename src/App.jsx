import { useEffect, useState } from "react";
import { loadAuth } from "./lib/authLogic";

import "./App.css";

import Authentication from "./screens/AuthenticationScreen";

// import Scorecard from "./components/Scorecard/Scorecard";

function App() {
  const [auth, setAuth] = useState({ session: null, user: null });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    loadAuth(setAuth);
  }, []);

  useEffect(() => {
    setShowLogin(auth.session ? false : true);
  }, [auth.session]);

  return (
    <>
      <Authentication
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        auth={auth}
      ></Authentication>
      {/* <Scorecard
        numRounds={3}
        fighterOne={"LANDON MIGAWA"}
        fighterTwo={"JON JONES"}
      /> */}
    </>
  );
}

export default App;
