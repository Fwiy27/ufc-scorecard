import "./HistoryScreen.css";

import { getMatches, deleteMatch } from "../../lib/matchLogic";
import { useEffect } from "react";
import { useState } from "react";

const HistoryScreen = ({ auth, setMatchId, setScreen, setShowLoading }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadMatches() {
      setShowLoading(true);
      const newMatches = await getMatches();
      setMatches(newMatches);
      setShowLoading(false);
    }
    loadMatches();
  }, []);

  const handleOpen = (matchId) => {
    setMatchId(matchId);
    setScreen("scorecard");
  };

  return (
    <div className="history-screen">
      <table className="record-container">
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Fighters</th>
            <th>Scores</th>
            <th>Last Updated</th>
            <th>Weight Class</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((record, index) => {
            const scoresArray = JSON.parse(record.scores);
            const scores = [
              scoresArray.reduce((acc, score) => acc + score[0], 0),
              scoresArray.reduce((acc, score) => acc + score[1], 0),
            ];
            const weightClass = record.weight_class
              .split("-")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");

            return (
              <tr
                key={`match-id-${record.id}`}
                className={index % 2 === 0 ? "even" : ""}
              >
                <td>{record.id}</td>
                <td className="fighters">
                  <p>{JSON.parse(record.fighter_one).join(" ")}</p>
                  <p>{JSON.parse(record.fighter_two).join(" ")}</p>
                </td>
                <td className="fighters">
                  <p>{scores[0]}</p>
                  <p>{scores[1]}</p>
                </td>
                <td>
                  {new Date(
                    record.updated_at || record.created_at
                  ).toLocaleString()}
                </td>
                <td>{weightClass}</td>
                <td>{record.event}</td>
                <td>
                  <button
                    onClick={() => {
                      handleOpen(record.id);
                    }}
                    className="open-btn"
                  >
                    OPEN
                  </button>
                  <button
                    onClick={() => {
                      if (deleteMatch(record.id)) {
                        const newMatches = matches.filter(
                          (m) => m.id !== record.id
                        );
                        setMatches(newMatches);
                      }
                    }}
                    className="delete-btn"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryScreen;
