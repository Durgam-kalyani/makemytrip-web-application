import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Trip<span>Easy</span>
      </Link>

      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/flights">Flights</NavLink>
        <NavLink to="/hotels">Hotels</NavLink>
        {user ? (
          <>
            <NavLink to="/my-bookings">My Bookings</NavLink>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn-small btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link to="/signup" className="btn btn-small">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
