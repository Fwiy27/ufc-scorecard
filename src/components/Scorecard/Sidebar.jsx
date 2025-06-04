import "./Sidebar.css";

const Sidebar = ({ numRounds, setScores, setDeductions }) => {
  const handleReset = () => {
    const resetScores = Array.from({ length: numRounds }, () => [0, 0]);
    const resetDeductions = Array.from({ length: numRounds }, () => [0, 0]);
    setScores(resetScores);
    setDeductions(resetDeductions);
  };

  return (
    <div className="scorecard-sidebar">
      <button className="save-btn">SAVE</button>
      <button className="share-btn">EDIT</button>
      <button onClick={handleReset} className="reset-btn">
        RESET
      </button>
    </div>
  );
};

export default Sidebar;
