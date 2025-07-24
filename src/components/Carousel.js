import React, { useRef } from "react";
import "./Carousel.css";

export default function Carousel({ books }) {
  const scrollRef = useRef();

  const scrollByWidth = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * 300, // Scroll by 300px chunk
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">Destined to Be Together</h2>
        <div className="carousel-buttons">
          <button onClick={() => scrollByWidth(-1)}>&lt;</button>
          <button onClick={() => scrollByWidth(1)}>&gt;</button>
        </div>
      </div>
      <div className="carousel-scroll" ref={scrollRef}>
        {books.map((book) => (
          <div key={book.id} className="carousel-card">
            <img src={book.coverUrl} alt={book.title} className="carousel-img" />
            <p className="carousel-text">{book.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
