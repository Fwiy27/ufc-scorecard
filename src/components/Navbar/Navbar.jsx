import "./Navbar.css";

const Navbar = ({ handleLogout, setScreen, setMatchId }) => {
  return (
    <div className="navbar">
      <div className="left">
        <button>DASHBOARD</button>
        <button
          onClick={() => {
            setScreen("scorecard");
          }}
        >
          SCORECARD
        </button>
        <button
          onClick={() => {
            setMatchId(null);
            setScreen("history");
          }}
        >
          HISTORY
        </button>
      </div>
      <div className="right">
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Navbar;
