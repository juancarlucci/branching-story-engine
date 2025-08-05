import React from "react";
import "./CategoryTags.css";
import CategoryHeader from "./CategoryHeader";
import SectionWrapper from "./SectionWrapper";

const categories = [
  "🐺 Werewolf Romance",
  "⚡ Dark Romance",
  "🐴 Mafia Romance",
  "🧙 Paranormal & Fantasy Romance",
  "💰 Billionaire Romance",
  "💪 Alpha Males",
  "High School Romance",
  "Spicy Romance",
  "Age Gap Romance",
];

export default function CategoryTags({ onTagClick }) {
  return (
    <SectionWrapper>
      <CategoryHeader title="Popular Categories" onViewAll={() => console.log("View all categories")} />
      <ul className="category-tag-list">
        {categories.map((cat) => (
          <li key={cat}>
            <button className="category-tag" onClick={() => onTagClick(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
