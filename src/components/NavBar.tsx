// @ts-nocheck
import { Link } from "react-router-dom";
import "./NavBar.css"; 

export default function NavBar() {
  return (
    <header className="navbar-header">
      <Link to="/" className="navbar-logo">
        GalateaClone
      </Link>
      <nav className="navbar-links">
            <Link to="/categories" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Categories</Link>
            <Link to="/login" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Log In</Link>
            </nav>
    </header>
  );
}
