export interface Book {
  id: number;
  title: string;
  rating?: number;
  reads: number;
  ageRating: string;
  author: string;
  summary: string;
  coverUrl: string;
  chapters: string[];
  genres?: string[];
}

export interface BookListProps {
  books: Book[];
  loading: boolean;
}

export interface CarouselProps {
  title: string;
  books: Book[];
  showIndexNumber?: boolean;
  limit?: number;
}

export interface CategoryTagsProps {
  onTagClick: (tag: string) => void;
}

export interface CategoryHeaderProps {
  title: string;
  onViewAll: () => void;
}
