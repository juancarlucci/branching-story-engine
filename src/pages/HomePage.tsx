// @ts-nocheck
import { books as mockBooks } from "../data/mockBooks";
import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import CategoryTags from "../components/CategoryTags";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [, setLoading] = useState(true);
  const booksByCategory = (genre) =>
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
      <CategoryTags onTagClick={(tag) => console.log("Filter by:", tag)} />
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
