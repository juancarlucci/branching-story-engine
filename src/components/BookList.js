import React, { useState, useCallback, useEffect } from "react";
import { highlightMatch } from "../utils";
import "./BookList.css";

export default function BookList({ books, loading }) {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  const getValue = (item, key) => item[key]?.toLowerCase?.() || "";

  const sortedData = [...filtered].sort((a, b) => {
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  function handleSort(key) {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => Math.min(prev + 1, sortedData.length - 1));
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [sortedData.length]
  );

  function handleBookClick(id) {
    window.location.href = `/products/${id}`;
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setActiveIndex(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="keyboard-table-wrapper" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="book-container">
        <input
          type="text"
          aria-label="Search books by title"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div aria-live="polite" style={{ position: "absolute", left: "-9999px" }}>
          Page {currentPage}
        </div>
        <div className="search-status-message" role="status" aria-live="polite">
          {loading
            ? "Loading results..."
            : filtered.length === 0
            ? "No books found."
            : `${filtered.length} book${filtered.length !== 1 ? "s" : ""} found`}
        </div>
        <ul className="book-list">
          {paginatedData.map((book) => (
            <li
              key={book.id}
              className="book-card"
              onClick={() => handleBookClick(book.id)}
              tabIndex="0"
            >
              <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="book-cover"
              />
              <div className="book-content">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-summary">{book.summary}</p>
                <div className="book-tags">
                  {book.genres.map((tag) => (
                    <span key={tag} className="book-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                p < Math.ceil(sortedData.length / itemsPerPage) ? p + 1 : p
              )
            }
            disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
