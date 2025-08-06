export function getBookById(id: number): Promise<{
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  reads: number;
  genres: string[];
  summary: string;
  ageRating?: string;
  chapters: string[];
}>;
