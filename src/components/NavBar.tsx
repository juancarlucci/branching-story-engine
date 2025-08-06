// @ts-nocheck
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          GalateaClone
        </Link>
        <nav className="navbar-links">
          <Link to="/categories">Categories</Link>
          <Link to="/login">Log In</Link>
          <Link to="/story">Story Engine</Link>
        </nav>
      </div>
    </header>
  );
}
