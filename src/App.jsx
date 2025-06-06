import { useEffect, useState } from "react";
import { loadAuth } from "./lib/authLogic";
import { getMatches } from "./lib/matchLogic";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Authentication from "./screens/AuthenticationScreen/AuthenticationScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import ScorecardScreen from "./screens/ScorecardScreen/ScorecardScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";

function App() {
  const [auth, setAuth] = useState(null);
  const [screen, setScreen] = useState("loading");
  const [showLoading, setShowLoading] = useState(false);
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const newAuth = await loadAuth();
      setAuth(newAuth);
      if (newAuth) {
        const maybeScreen = localStorage.getItem("screen");
        if (maybeScreen) {
          setScreen(maybeScreen);
        } else {
          setScreen("scorecard");
        }
      } else {
        setScreen("login");
      }
    };
    fetchAuth();
  }, []);

  useEffect(() => {
    if (["dashboard", "scorecard", "history"].includes(screen)) {
      localStorage.setItem("screen", screen);
    }
  }, [screen]);

  useEffect(() => {
    const maybeMatchId = localStorage.getItem("match-id");
    if (maybeMatchId) {
      setMatchId(maybeMatchId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-info");
    setAuth(null);
    window.location.reload();
  };

  return (
    <>
      {screen != "loading" && screen != "login" && (
        <Navbar handleLogout={handleLogout} setScreen={setScreen} />
      )}
      {(screen == "loading" || showLoading) && <LoadingScreen />}
      {screen == "login" && (
        <Authentication setScreen={setScreen} setAuth={(a) => setAuth(a)} />
      )}
      {screen == "scorecard" && (
        <ScorecardScreen
          matchId={matchId}
          setMatchId={setMatchId}
          handleLogout={handleLogout}
        />
      )}
      {screen == "history" && (
        <HistoryScreen
          auth={auth}
          setMatchId={setMatchId}
          setScreen={setScreen}
          setShowLoading={setShowLoading}
        />
      )}
    </>
  );
}

export default App;
