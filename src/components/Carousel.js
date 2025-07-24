import React, { useRef, useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ books }) {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    const updateScrollButtons = () => {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollByWidth = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir * 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">Destined to Be Together</h2>
      </div>

      <div className="carousel-wrapper">
        {canScrollLeft && (
          <button
            onClick={() => scrollByWidth(-1)}
            className="carousel-btn left"
            aria-label="Scroll left"
          >
            &#8249;
          </button>
        )}

        <div className="carousel-scroll" ref={scrollRef}>
          {books.map((book) => (
            <div key={book.id} className="carousel-card">
              <img src={book.coverUrl} alt={book.title} className="carousel-img" />
              <p className="carousel-text">{book.title}</p>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scrollByWidth(1)}
            className="carousel-btn right"
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
}
