import Scorecard from "../../components/Scorecard/Scorecard";
import Sidebar from "../../components/Scorecard/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { useState } from "react";

import { insertMatch } from "../../lib/matchLogic";

import "./ScorecardScreen.css";

const parseName = (name) => {
  const parts = name.split(" ");
  if (parts.length < 2) return [name.toUpperCase(), ""];
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  return [firstName.toUpperCase(), lastName.toUpperCase()];
};

const ScorecardScreen = ({ matchId, setMatchId, handleLogout }) => {
  const [numRounds, setNumRounds] = useState(3);
  const [fighterOne, setFighterOne] = useState(parseName("FIGHTER ONE"));
  const [fighterTwo, setFighterTwo] = useState(parseName("FIGHTER TWO"));
  const [event, setEvent] = useState("");
  const [weightClass, setWeightClass] = useState("");
  const [previousNumRounds, setPreviousNumRounds] = useState(3);

  const [previousScores, setPreviousScores] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );
  const [previousDeductions, setPreviousDeductions] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const [scores, setScores] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );
  const [deductions, setDeductions] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const handleReset = () => {
    setNumRounds(previousNumRounds);
    setScores(previousScores.map((arr) => [...arr]));
    setDeductions(previousDeductions.map((arr) => [...arr]));
  };

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
    console.log({
      fighterOne: fighterOne,
      fighterTwo: fighterTwo,
      event: event,
      numRounds: numRounds,
      roundScores: parsedScores,
      weightClass: weightClass,
    });
    if (matchId) {
      // UPDATE MATCH INSTEAD OF CREATE NEW
      console.log("implement update logic");
    } else
      insertMatch(
        fighterOne,
        fighterTwo,
        event,
        numRounds,
        parsedScores,
        weightClass
      )
        .then((newMatchId) => {
          setMatchId(newMatchId);
        })
        .catch((error) => console.error("Error inserting match:", error));
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
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
            setMatchId={setMatchId}
            setDeductions={setDeductions}
            handleSave={handleSave}
            parseName={parseName}
            event={event}
            scores={scores}
            setPreviousScores={setPreviousScores}
            setPreviousDeductions={setPreviousDeductions}
            fighterOne={fighterOne}
            fighterTwo={fighterTwo}
            handleReset={handleReset}
            weightClass={weightClass}
            setFighterOne={(name) => setFighterOne(parseName(name))}
            setFighterTwo={(name) => setFighterTwo(parseName(name))}
            setEvent={setEvent}
            setWeightClass={setWeightClass}
            setNumRounds={setNumRounds}
          />
        </div>
      </div>
    </>
  );
};

export default ScorecardScreen;
