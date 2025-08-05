//* src/pages/AllCategoriesPage.js
import { categories } from "../data/categories";
import "./AllCategories.css";

export default function AllCategoriesPage() {
  return (
    <div className="all-categories-container">
      <h1>Browse All Categories</h1>
      {Object.entries(categories).map(([group, tags]) => (
        <div className="category-group" key={group}>
          <h2>{group}</h2>
          <ul className="category-list">
            {tags.map((tag) => (
              <li key={tag} className="category-item">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}