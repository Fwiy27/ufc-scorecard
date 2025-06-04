import { useEffect, useState } from "react";
import { loadAuth } from "./lib/authLogic";

import "./App.css";

import Authentication from "./screens/AuthenticationScreen/AuthenticationScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import { use } from "react";

// import Scorecard from "./components/Scorecard/Scorecard";

function App() {
  const [auth, setAuth] = useState({ session: null, user: null });
  const [showLogin, setShowLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuth() {
      const maybeAuth = await loadAuth(setAuth);
      if (maybeAuth) {
        setAuth(maybeAuth);
        setShowLogin(maybeAuth.session ? false : true);
      } else {
        // fallback: if loadAuth only sets via setAuth
        setShowLogin((prev) => (auth.session ? false : true));
      }
      setLoading(false);
    }
    fetchAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && showLogin && (
        <Authentication
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          auth={auth}
        />
      )}
      {/* <Scorecard
        numRounds={3}
        fighterOne={"LANDON MIGAWA"}
        fighterTwo={"JON JONES"}
      /> */}
    </>
  );
}

export default App;
