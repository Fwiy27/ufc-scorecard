import "./Scorecard.css";
import { useState } from "react";
import PropTypes from "prop-types";

const parseName = (name) => {
  const parts = name.split(" ");
  return [parts[0], parts.slice(1).join(" ")];
};

const Scorecard = ({ numRounds, fighterOne, fighterTwo }) => {
  const nameOne = parseName(fighterOne);
  const nameTwo = parseName(fighterTwo);

  const [scores, setScores] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const [deductions, setDeductions] = useState(
    Array.from({ length: numRounds }, () => [0, 0])
  );

  const getTotalScores = () => {
    const totals = [0, 0];
    for (let i = 0; i < numRounds; i++) {
      totals[0] += scores[i][0] - deductions[i][0];
      totals[1] += scores[i][1] - deductions[i][1];
    }
    return totals;
  };

  const handleScoreClick = (roundIndex, fighterIndex) => {
    const newScores = [...scores];
    const currentValue = newScores[roundIndex][fighterIndex];
    let newValue;
    newValue =
      currentValue == 0 ? 10 : currentValue == 7 ? 0 : currentValue - 1;
    newScores[roundIndex][fighterIndex] = newValue;
    setScores(newScores);
  };

  const handleDeductionClick = (roundIndex, fighterIndex) => {
    const newDeductions = [...deductions];
    const currentValue = newDeductions[roundIndex][fighterIndex];
    const newValue = currentValue == 3 ? 0 : currentValue + 1;
    newDeductions[roundIndex][fighterIndex] = newValue;
    setDeductions(newDeductions);
  };

  return (
    <div className="scorecard">
      <div className="names-container">
        <div className="ftr-1 name-container left">
          <p className="fst-nm">{nameOne[0]}</p>
          <p className="lst-nm">{nameOne[1]}</p>
        </div>
        <div className="ftr-2 name-container right">
          <p className="fst-nm">{nameTwo[0]}</p>
          <p className="lst-nm">{nameTwo[1]}</p>
        </div>
      </div>

      <div className="header-container">
        <p className="rnd-info left">ROUND SCORE</p>
        <p className="rnd-info">POINT DEDUCT.</p>
        <p className="rnd-info">ROUND</p>
        <p className="rnd-info">POINT DEDUCT.</p>
        <p className="rnd-info right">ROUND SCORE</p>
      </div>

      <div className="scores-container">
        {Array.from({ length: numRounds }, (_, roundIndex) => (
          <div key={roundIndex} className={`rnd`}>
            <button
              className="rnd-btn score left"
              onClick={() => handleScoreClick(roundIndex, 0)}
            >
              {scores[roundIndex][0] == 0 ? "" : scores[roundIndex][0]}
            </button>
            <button
              className="rnd-btn pnt-deduc"
              onClick={() => handleDeductionClick(roundIndex, 0)}
            >
              {deductions[roundIndex][0] == 0 ? "" : deductions[roundIndex][0]}
            </button>
            <button className="rnd-mid">{roundIndex + 1}</button>
            <button
              className="rnd-btn pnt-deduc"
              onClick={() => handleDeductionClick(roundIndex, 1)}
            >
              {deductions[roundIndex][1] == 0 ? "" : deductions[roundIndex][1]}
            </button>
            <button
              className="rnd-btn score right"
              onClick={() => handleScoreClick(roundIndex, 1)}
            >
              {scores[roundIndex][1] == 0 ? "" : scores[roundIndex][1]}
            </button>
          </div>
        ))}
      </div>

      <div className="total-container">
        <p className="rnd-info total-info ftr-1 left">{getTotalScores()[0]}</p>
        <p className="rnd-info">TOTAL</p>
        <p className="rnd-info total-info ftr-2 right">{getTotalScores()[1]}</p>
      </div>
    </div>
  );
};

Scorecard.propTypes = {
  numRounds: PropTypes.number,
  fighterOne: PropTypes.string,
  fighterTwo: PropTypes.string,
};

export default Scorecard;
