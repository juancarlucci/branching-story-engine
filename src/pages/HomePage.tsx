// @ts-nocheck
// import { fetchBooks } from "../lib/bookService";
import { books as mockBooks } from "../data/mockBooks";
import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
// import BookList from "../components/BookList";
import CategoryTags from "../components/CategoryTags";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [, setLoading] = useState(true);
  const booksByCategory = (genre) =>
    books.filter((book) =>
      book.genres?.some((g) => g.toLowerCase() === genre.toLowerCase())
    );

  useEffect(() => {
    setBooks(mockBooks); // no need for async
    setLoading(false);
  }, [books]);

  return (
    <div className="homepage-wrapper">
      <HeroBanner />
      {booksByCategory("Romance").length > 0 && (
        <Carousel
          title="Destined to Be Together"
          books={booksByCategory("Romance")}
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
