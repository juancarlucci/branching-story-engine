import { useState, useEffect } from "react";
import { fetchBooks } from "../lib/bookService";
import HeroBanner from "../components/HeroBanner";
import Carousel from "../components/Carousel";
import BookList from "../components/BookList";

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(console.error);
  }, []);

  return (
    <>
      {/* hero, carousel, tags, list */}
      <HeroBanner />
      <Carousel books={books.slice(0, 10)} />
      <BookList books={books} />
    </>
  );
}
