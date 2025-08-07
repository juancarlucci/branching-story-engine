import { useEffect, useState } from "react";
import { books as mockBooks } from "../data/mockBooks";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import CategoryTags from "../components/CategoryTags";
import { Book } from "../types";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [, setLoading] = useState(true);

  const booksByCategory = (genre: string): Book[] =>
    books.filter((book) =>
      book.genres?.some((g) => g.toLowerCase() === genre.toLowerCase())
    );

  useEffect(() => {
    setBooks(mockBooks);
    setLoading(false);
  }, []);

  return (
    <div className="homepage-wrapper">
      <HeroBanner />
      {booksByCategory("Destined").length > 0 && (
        <Carousel
          title="Destined to Be Together"
          books={booksByCategory("Destined")}
        />
      )}
      <CategoryTags onTagClick={(tag: string) => console.log("Filter by:", tag)} />
      {booksByCategory("CEO & Boss").length > 0 && (
        <Carousel title="CEO & Boss" books={booksByCategory("CEO & Boss")} />
      )}
      {booksByCategory("Romance").length > 0 && (
        <Carousel
          title="Top in Romance"
          books={booksByCategory("Romance")}
          showIndexNumber
          limit={10}
        />
      )}
    </div>
  );
}
