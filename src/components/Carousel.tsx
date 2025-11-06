import { useRef, useState, useEffect, JSX } from "react";
import { Link } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import SectionWrapper from "./SectionWrapper";
import "./Carousel.css";
import type { Book } from "../types";

interface CarouselProps {
  title: string;
  books: Book[];
  showIndexNumber?: boolean;
  limit?: number;
}

export default function Carousel({
  title,
  books,
  showIndexNumber = false,
  limit,
}: CarouselProps): JSX.Element {
  const visibleBooks = Array.isArray(books)
    ? limit
      ? books.slice(0, limit)
      : books
    : [];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollButtons = () => {
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

  const scrollByWidth = (dir: number) => {
    scrollRef.current?.scrollBy({
      left: dir * 300,
      behavior: "smooth",
    });
  };

  return (
    <SectionWrapper>
      <CategoryHeader
        title={title}
        onViewAll={() => console.log(`View all ${title}`)}
      />

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
              key={book.id ?? index}
              role="group"
              aria-roledescription="slide"
              className="carousel-card-wrapper card-relative"
            >
              <div className="card-container">
                {showIndexNumber && (
                  <span className="indexNumber">{index + 1}</span>
                )}
                <Link to={`/books/${book.id}`} className="card-link">
                  <div
                    className="card-image"
                    style={{
                      backgroundImage: `url("${
                        book.coverUrl ||
                        "https://picsum.photos/256/400?random=1"
                      }")`,
                    }}
                  />
                  <div className="card-text">
                    <p className="card-title">{book.title}</p>
                    <p className="card-author">by {book.author}</p>
                  </div>
                </Link>
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
