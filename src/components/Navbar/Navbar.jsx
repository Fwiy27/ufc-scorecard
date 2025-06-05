import "./Navbar.css";

const Navbar = ({ handleLogout }) => {
  return (
    <div className="navbar">
      <div className="left">
        <button>DASHBOARD</button>
        <button>NEW SCORECARD</button>
        <button>HISTORY</button>
      </div>
      <div className="right">
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Navbar;
