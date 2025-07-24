import "./HeroBanner.css";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <p className="hero-title">
          Treat Yourself. Read addictive stories from the <span className="highlight">web's top authors.</span>
        </p>
        <p className="hero-subtitle">
          Are you a new user? Simply enter the code <strong>‘WELCOME’</strong> to unlock your discount today.
        </p>
        <a className="hero-button" href="/subscribe">
          Get Offer Now
        </a>
      </div>
    </section>
  );
}
