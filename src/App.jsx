import { useEffect, useState } from "react";
import { loadAuth } from "./lib/authLogic";

import "./App.css";

import Authentication from "./screens/AuthenticationScreen/AuthenticationScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import ScorecardScreen from "./screens/ScorecardScreen/ScorecardScreen";

function App() {
  const [auth, setAuth] = useState({ session: null, user: null });
  const [showLogin, setShowLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchId, setMatchId] = useState(null);

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
      {!loading && !showLogin && (
        <ScorecardScreen matchId={matchId} setMatchId={setMatchId} />
      )}
    </>
  );
}

export default App;
