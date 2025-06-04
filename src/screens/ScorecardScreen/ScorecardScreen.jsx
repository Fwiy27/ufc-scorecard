import Scorecard from "../../components/Scorecard/Scorecard";
import Sidebar from "../../components/Scorecard/Sidebar";

import { useEffect, useState } from "react";

import { insertMatch, updateMatch } from "../../lib/matchLogic";

import "./ScorecardScreen.css";

const ScorecardScreen = ({ matchId, setMatchId }) => {
  const numRounds = 3;
  const fighterOne = ["JACK", "DELLA MADALLENA"];
  const fighterTwo = ["JON", "JONES"];

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
        />
      </div>
    </div>
  );
};

export default ScorecardScreen;
