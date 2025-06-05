import "./Sidebar.css";

const Sidebar = ({
  matchId,
  setMatchId,
  numRounds,
  setScores,
  setDeductions,
  handleSave,
  setFighterOne,
  setFighterTwo,
  setNumRounds,
  setEvent,
  setWeightClass,
}) => {
  const handleReset = () => {
    const resetScores = Array.from({ length: numRounds }, () => [0, 0]);
    const resetDeductions = Array.from({ length: numRounds }, () => [0, 0]);
    setScores(resetScores);
    setDeductions(resetDeductions);
  };

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
            onChange={(e) => setFighterOne(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Fighter Two"
            className="search-input"
            onChange={(e) => setFighterTwo(e.target.value)}
          ></input>
          <input
            type="event"
            placeholder="Event"
            className="search-input"
            onChange={(e) => {
              setEvent(e.target.value);
            }}
          ></input>
          <button
            className="rounds-btn"
            onClick={() => {
              setNumRounds(numRounds == 5 ? 3 : 5);
              console.log("Rounds toggled to", numRounds == 5 ? 3 : 5);
            }}
          >{`${numRounds} Rounds`}</button>
          <select
            id="weight-class-select"
            onChange={(e) => {
              setWeightClass(e.target.value);
            }}
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
          <button className={matchId ? "saved" : "unsaved"}>
            {matchId ? `Saved: Match ID: ${matchId}` : "Match Not Saved"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
