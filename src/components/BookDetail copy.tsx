// @ts-nocheck
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { books } from "../data/mockBooks";
import "./BookDetail.css";

export default function BookDetail() {

  const [activeTab, setActiveTab] = useState("summary");
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleChapterList = () => setShowSidebar(prev => !prev);


  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-outer">
    <div className="book-container">
      <div className="book-top">
        <img className="book-cover" src={book.coverUrl} alt={book.title} />
        <div className="book-meta">
          <h1>{book.title}</h1>
          <div className="book-stats">
            <div className="book-stats-group">
              <div className="book-stats-item">AUTHOR</div>
              <div className="book-stats-author">{book.author}</div>
            </div>
            <span className="book-stats-divider"></span>
            <div className="book-stats-group">
              <div className="book-stats-item">READS</div>
              <div className="book-stats-reads">🔥 {book.reads}M</div>
            </div>
            <span className="book-stats-divider"></span>
            <div className="book-stats-group">
              <div className="book-stats-item">CHAPTERS</div>
              <div className="book-stats-chapters">
                {book?.chapters?.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-tags">
        {book.genres.map((tag, i) => (
          <span key={i} className="book-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="summary-chapter-wrapper">
        <div className="tab-nav">
          <button
            className={`tab-button ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={`tab-button ${activeTab === "chapters" ? "active" : ""}`}
            onClick={() => setActiveTab("chapters")}
          >
            Chapters
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="book-summary">
            <p>{book.summary}</p>
            <div className="book-age-rating">
              Age Rating:{book.ageRating || "18+!"}
            </div>
          </div>
        )}
        <hr className="chapter-divider" />
        <h3>{book?.chapters[0]}</h3>
        {activeTab === "chapters" && (
          <ul className="book-chapters">
            {book?.chapters?.map((title, idx) => (
              <li key={idx}>
                <a href={`/read/${book.id}/chapter/${idx + 1}`}>{title}</a>
              </li>
            )) ?? <li>No chapters available.</li>}
          </ul>
        )}
        {activeTab === "summary" && (
          <div className="button-container">
            <button className="next-chapter-btn">Next Chapter</button>
          </div>
        )}
      </div>

      <div className={`chapter-sidebar ${showSidebar ? "open" : ""}`}>
        <h2>{book.title}</h2>
        <ul>
          {book?.chapters?.map((ch, idx) => (
            <li key={idx}>
              <a href={`/read/${book.id}/chapter/${idx + 1}`}>{ch}</a>
            </li>
          ))}
        </ul>
      </div>
      <button className="floating-chapter-btn" onClick={toggleChapterList}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
</svg>        </button>
        {showSidebar && (
  <div className="sidebar-backdrop" onClick={() => setShowSidebar(false)} />
)}
    </div>
    </div>
  );
}
