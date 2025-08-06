import "./HeroBanner.css";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <p className="hero-title">
        Treat Yourself. Read addictive stories from the{" "}
        <span className="highlight">web's top authors.</span>
      </p>
      <p className="hero-subtitle">
        Are you a new user? Simply enter the code <strong>‘WELCOME’</strong> to unlock your discount today.
      </p>
      <a
        className="hero-cta"
        href="/en/p/subscription?coupon=WELCOME&source=discovery_banner_offer"
      >
        Get Offer Now
      </a>
    </section>
  );
}
