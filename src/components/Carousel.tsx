// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CategoryHeader from "./CategoryHeader";
import "./Carousel.css";
import SectionWrapper from "./SectionWrapper";

export default function Carousel({ title, books, showIndexNumber = false, limit }) {
  const visibleBooks = Array.isArray(books)
    ? (limit ? books.slice(0, limit) : books)
    : [];
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
    <SectionWrapper>
           <CategoryHeader title={title} onViewAll={() => console.log(`View all ${title}`)} />


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
          {visibleBooks.map((book, index) => (
            
            <div
              role="group"
              key={book.id ?? index}
              aria-roledescription="slide"
              className="carousel-card-wrapper card-relative"
            >
            
              <div key={book.id} className="card-container">
                <div
                  key={book.id}
                  className={`${["carousel-card-wrapper"]} ${[
                    "card-relative",
                  ]}`}
                >
                  {showIndexNumber && (
                    <span className={"indexNumber"}>{index + 1}</span>
                  )}
                  <Link to={`/books/${book.id}`} className="card-link">
                   <div
                      className="card-image"
                      style={{
                        backgroundImage: `url("${book.coverUrl || 'https://picsum.photos/256/400?random=1'}")`
                      }}
                    ></div>
                    <div className="card-text">
                      <p className="card-title">{book.title}</p>
                      <p className="card-author">by {book.author}</p>
                    </div>
                  </Link>
                </div>
              </div>
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
    </SectionWrapper>
  );
}
