// @ts-nocheck
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Mobile hamburger */}
        <div className="nav-hamburger" role="button" aria-label="Menu">
          ☰
        </div>

        {/* Mobile: vertical logo */}
        <Link to="/" className="nav-logo-mobile" aria-label="Go to homepage">
          <img
            src="/galatea-logo-vertical.webp"
            alt="Galatea logo"
            width="110"
            height="32"
          />
        </Link>

        {/* Desktop: horizontal logo group */}
        <Link to="/" className="navbar-logo-group" aria-label="Go to homepage">
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

        {/* Links */}
        <nav className="navbar-links">
          <a href="/en/p/subscription" className="nav-cta">
            Get Unlimited Access
          </a>
          <Link to="/categories" className="nav-link-desktop-only">
            Categories
          </Link>
          <Link to="/login">Log In</Link>
          <Link to="/story">Story Engine</Link>
        </nav>
      </div>
    </header>
  );
}
