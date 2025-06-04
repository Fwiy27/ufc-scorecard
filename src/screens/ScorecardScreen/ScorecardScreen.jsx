import Scorecard from "../../components/Scorecard/Scorecard";
import Sidebar from "../../components/Scorecard/Sidebar";

import { useState } from "react";

import "./ScorecardScreen.css";

const ScorecardScreen = () => {
  const numRounds = 3;

  const [scores, setScores] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const [deductions, setDeductions] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  return (
    <div className="scorecard-screen-center">
      <div className="scorecard-screen">
        <Scorecard
          numRounds={numRounds}
          fighterOne={"LANDON MIGAWA"}
          fighterTwo={"JON JONES"}
          scores={scores}
          setScores={setScores}
          deductions={deductions}
          setDeductions={setDeductions}
        />
        <Sidebar
          numRounds={numRounds}
          setScores={setScores}
          setDeductions={setDeductions}
        />
      </div>
    </div>
  );
};

export default ScorecardScreen;
