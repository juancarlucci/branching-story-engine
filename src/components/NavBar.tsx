// @ts-nocheck
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-group" aria-label="Go to homepage">
          {/* Mobile-only vertical logo */}
          <img
            className="logo-vertical"
            src="/galatea-logo-solo.webp"
            alt="Galatea logo"
            width="110"
            height="32"
          />
          {/* Desktop logo row */}
          <div className="logo-horizontal">
            <img
              src="/galatea-logo-solo.webp"
              alt="Galatea logo"
              width="123"
              height="32"
            />
            <span className="logo-by">by</span>
            <img
              src="/inkitt-logo.webp"
              alt="Inkitt logo"
              width="44"
              height="14"
            />
          </div>
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

