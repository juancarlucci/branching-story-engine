import { JSX } from "react";
import "./CategoryTags.css";
import CategoryHeader from "./CategoryHeader";
import SectionWrapper from "./SectionWrapper";

interface CategoryTagsProps {
  onTagClick: (tag: string) => void;
}

const categories: string[] = [
  "🐺 Werewolf Romance",
  "⚡ Dark Romance",
  "🐴 Mafia Romance",
  "🧙 Paranormal & Fantasy Romance",
  "💰 Billionaire Romance",
  "💪 Alpha Males",
  "🏫 High School Romance",
  "🌶️ Spicy Romance",
  "🔞 Age Gap Romance",
];

export default function CategoryTags({
  onTagClick,
}: CategoryTagsProps): JSX.Element {
  return (
    <SectionWrapper>
      <CategoryHeader
        title="Popular Categories"
        onViewAll={() => console.log("View all categories")}
      />
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
