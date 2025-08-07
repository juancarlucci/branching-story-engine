//* src/components/HeroBanner.tsx
import { JSX } from "react";
import "./HeroBanner.css";

export default function HeroBanner(): JSX.Element {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Explore Stories Like Never Before</h1>
        <p className="hero-subtitle">
          Dive into interactive fiction where your choices shape the outcome.
        </p>
        <a href="/story" className="hero-cta">
          Start Reading →
        </a>
      </div>
    </section>
  );
}
