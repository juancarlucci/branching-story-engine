import { useParams } from "react-router-dom";
import { books as mockBooks } from "../data/mockBooks";
import BookList from "../components/BookList";
import { Book } from "../types";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();

  const filteredBooks: Book[] = mockBooks.filter((book) =>
    book.genres?.some((g) => g.toLowerCase() === name?.toLowerCase())
  );

  return (
    <main className="category-page">
      <h1>{name} Books</h1>
      <BookList books={filteredBooks} loading={false} />
    </main>
  );
}
