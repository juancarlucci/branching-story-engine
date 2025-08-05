import './CategoryHeader.css';

export default function CategoryHeader({ title, onViewAll }) {
  return (
    <div className="category-header">
      <h2>{title}</h2>
      <button className="view-all-btn" onClick={onViewAll} aria-label={`View all ${title}`}>
        View all
      </button>
    </div>
  );
}