import { JSX } from 'react';
import './CategoryHeader.css';

interface CategoryHeaderProps {
  title: string;
  onViewAll: () => void;
}

export default function CategoryHeader({
  title,
  onViewAll,
}: CategoryHeaderProps): JSX.Element {
  return (
    <div className="category-header">
      <h2>{title}</h2>
      <button className="view-all-btn" onClick={onViewAll} aria-label={`View all ${title}`}>
        View all
      </button>
    </div>
  );
}