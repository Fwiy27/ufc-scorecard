import Scorecard from "../../components/Scorecard/Scorecard";
import Sidebar from "../../components/Scorecard/Sidebar";

import { useEffect, useState } from "react";

import { insertMatch, updateMatch } from "../../lib/matchLogic";

import "./ScorecardScreen.css";

const parseName = (name) => {
  const parts = name.split(" ");
  if (parts.length < 2) return [name.toUpperCase(), ""];
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return [firstName.toUpperCase(), lastName.toUpperCase()];
};

const ScorecardScreen = ({ matchId, setMatchId }) => {
  const [numRounds, setNumRounds] = useState(3);
  const [fighterOne, setFighterOne] = useState(parseName("FIGHTER ONE"));
  const [fighterTwo, setFighterTwo] = useState(parseName("FIGHTER TWO"));

  const [scores, setScores] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const [deductions, setDeductions] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const parseScores = () => {
    const parsedScores = [];
    for (let i = 0; i < numRounds; i++) {
      parsedScores.push([
        scores[i][0],
        scores[i][1],
        deductions[i][0],
        deductions[i][1],
      ]);
    }
    return parsedScores;
  };

  const handleSave = () => {
    const parsedScores = parseScores();

    if (matchId) {
      updateMatch(matchId, parsedScores)
        .then(() => console.log("Match updated successfully"))
        .catch((error) => console.error("Error updating match:", error));
    } else
      insertMatch(fighterOne, fighterTwo, numRounds, parsedScores)
        .then((newMatchId) => {
          console.log("Match inserted successfully");
          setMatchId(newMatchId);
        })
        .catch((error) => console.error("Error inserting match:", error));
    console.log("Scores saved:", parsedScores);
    console.log("Match Id:", matchId);
  };

  return (
    <div className="scorecard-screen-center">
      <div className="scorecard-screen">
        <Scorecard
          numRounds={numRounds}
          fighterOne={fighterOne}
          fighterTwo={fighterTwo}
          scores={scores}
          setScores={setScores}
          deductions={deductions}
          setDeductions={setDeductions}
        />
        <Sidebar
          matchId={matchId}
          numRounds={numRounds}
          setScores={setScores}
          setDeductions={setDeductions}
          handleSave={handleSave}
          parseName={parseName}
          fighterOne={fighterOne}
          fighterTwo={fighterTwo}
          setFighterOne={(name) => setFighterOne(parseName(name))}
          setFighterTwo={(name) => setFighterTwo(parseName(name))}
          setNumRounds={(num) => {
            const newNumRounds = Math.max(3, Math.min(num, 5));
            setNumRounds(newNumRounds);
            setScores(Array.from({ length: newNumRounds }, () => [0, 0]));
            setDeductions(Array.from({ length: newNumRounds }, () => [0, 0]));
          }}
        />
      </div>
    </div>
  );
};

export default ScorecardScreen;
