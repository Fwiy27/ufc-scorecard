import { useEffect, useState } from "react";
import { loadAuth } from "./lib/authLogic";
import { getMatches } from "./lib/matchLogic";

import "./App.css";

import Authentication from "./screens/AuthenticationScreen/AuthenticationScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import ScorecardScreen from "./screens/ScorecardScreen/ScorecardScreen";

function App() {
  const [auth, setAuth] = useState(null);
  const [showLogin, setShowLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const newAuth = await loadAuth();
      setAuth(newAuth);
      setLoading(false);
      setShowLogin(!newAuth);
    };
    fetchAuth();
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && showLogin && (
        <Authentication
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setAuth={(a) => setAuth(a)}
        />
      )}
      {!loading && !showLogin && (
        <ScorecardScreen matchId={matchId} setMatchId={setMatchId} />
      )}
    </>
  );
}

export default App;
