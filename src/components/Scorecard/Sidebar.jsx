import "./Sidebar.css";
import { useState } from "react";
import { getMatch } from "../../lib/matchLogic";

const Sidebar = ({
  matchId,
  setMatchId,
  numRounds,
  setScores,
  scores,
  setDeductions,
  setPreviousDeductions,
  setPreviousScores,
  handleSave,
  fighterOne,
  event,
  fighterTwo,
  setFighterOne,
  setFighterTwo,
  setNumRounds,
  handleReset,
  setEvent,
  setWeightClass,
  weightClass,
}) => {
  const handleLoadMatch = async () => {
    const newMatchId = prompt("Load Match ID:");

    const matchData = await getMatch(newMatchId);

    if (!matchData) {
      console.log("No Match Data Found");
      return;
    }

    setMatchId(newMatchId);

    const scores = JSON.parse(matchData.scores);

    const parsedScores = scores.map((round) => [round[0], round[1]]);

    const parsedDeductions = scores.map((round) => [round[2], round[3]]);

    setNumRounds(matchData.num_rounds);
    setEvent(matchData.event);
    setScores(parsedScores.map((round) => [...round]));
    setPreviousScores(parsedScores.map((round) => [...round]));
    setDeductions(parsedDeductions.map((round) => [...round]));
    setPreviousDeductions(parsedDeductions.map((round) => [...round]));
    setFighterOneInput(JSON.parse(matchData.fighter_one).join(" "));
    setFighterTwoInput(JSON.parse(matchData.fighter_two).join(" "));
    setFighterOne(JSON.parse(matchData.fighter_one).join(" "));
    setFighterTwo(JSON.parse(matchData.fighter_two).join(" "));
    setWeightClass(matchData.weight_class);
  };

  const handleRoundsChange = () => {
    setScores((prevScores) =>
      numRounds === 5 ? prevScores.slice(0, 3) : [...prevScores, [0, 0], [0, 0]]
    );
    setDeductions((prevDeductions) =>
      numRounds === 5
        ? prevDeductions.slice(0, 3)
        : [...prevDeductions, [0, 0], [0, 0]]
    );
  };

  const [fighterOneInput, setFighterOneInput] = useState("");
  const [fighterTwoInput, setFighterTwoInput] = useState("");

  return (
    <>
      <div className="scorecard-sidebar">
        <div className="btn-container">
          <button onClick={handleSave} className="save-btn">
            {matchId ? "UPDATE" : "SAVE"}
          </button>
          <button onClick={handleReset} className="reset-btn">
            RESET
          </button>
        </div>
        <div className="inputs-container">
          <input
            type="text"
            placeholder="Fighter One"
            className="search-input"
            value={fighterOneInput}
            onChange={(e) => {
              setFighterOneInput(e.target.value);
              setFighterOne(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Fighter Two"
            className="search-input"
            value={fighterTwoInput}
            onChange={(e) => {
              setFighterTwoInput(e.target.value);
              setFighterTwo(e.target.value);
            }}
          ></input>
          <input
            type="event"
            placeholder="Event"
            className="search-input"
            value={event}
            onChange={(e) => {
              setEvent(e.target.value);
            }}
          ></input>
          <button
            className="rounds-btn"
            onClick={() => {
              handleRoundsChange();
              setNumRounds(numRounds == 5 ? 3 : 5);
              console.log("Rounds toggled to", numRounds == 5 ? 3 : 5);
            }}
          >{`${numRounds} Rounds`}</button>
          <select
            id="weight-class-select"
            onChange={(e) => setWeightClass(e.target.value)}
            value={weightClass}
          >
            <option value="">WEIGHT CLASS</option>
            <option value="strawweight">STRAWWEIGHT</option>
            <option value="FLYWEIGHT">FLYWEIGHT</option>
            <option value="bantamweight">BANTAMWEIGHT</option>
            <option value="featherweight">FEATHERWEIGHT</option>
            <option value="lightweight">LIGHTWEIGHT</option>
            <option value="welterweight">WELTERWEIGHT</option>
            <option value="middleweight">MIDDLEWEIGHT</option>
            <option value="light-heavyweight">LIGHT HEAVYWEIGHT</option>
            <option value="heavyweight">HEAVYWEIGHT</option>
          </select>
          <button
            className={matchId ? "saved" : "unsaved"}
            onClick={handleLoadMatch}
          >
            {matchId ? `Saved: Match ID: ${matchId}` : "Match Not Saved"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
