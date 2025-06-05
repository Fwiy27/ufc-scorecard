import "./Sidebar.css";

const Sidebar = ({
  matchId,
  numRounds,
  setScores,
  setDeductions,
  handleSave,
  parseName,
  fighterOne,
  fighterTwo,
  setFighterOne,
  setFighterTwo,
  setNumRounds,
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
            type="number"
            placeholder="Number of Rounds"
            className="search-input"
            min={3}
            max={5}
            step={2}
            defaultValue={3}
            onChange={(e) => {
              if (e.target.value === "") {
                setNumRounds(3);
                return;
              }
              if (isNaN(e.target.value)) {
                return;
              }
              if (!["3", "5"].includes(e.target.value)) {
                return;
              }
              setNumRounds(parseInt(e.target.value));
            }}
          ></input>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
