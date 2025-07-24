import React from "react";
import "./CategoryTags.css";

const categories = [
  "Werewolf Romance",
  "Dark Romance",
  "Mafia Romance",
  "Paranormal & Fantasy Romance",
  "Billionaire Romance",
  "Alpha Males",
  "High School Romance",
  "Spicy Romance",
  "Age Gap Romance",
];

export default function CategoryTags({ onTagClick }) {
  return (
    <div className="category-section">
      <div className="category-header">
        <h2>Popular Categories</h2>
        <button className="view-all-btn" aria-label="View all categories">
          View all
        </button>
      </div>
      <ul className="category-tag-list">
        {categories.map((cat) => (
          <li key={cat}>
            <button className="category-tag" onClick={() => onTagClick(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
