import { books } from "../data/mockBooks";

export async function fetchBooks() {
  const res = await fetch("https://dummyjson.com/products?limit=50");
  if (!res.ok) throw new Error("Failed to fetch books");
  const { products } = await res.json();
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    author: p.brand,
    summary: p.description,
    coverUrl: p.thumbnail,
    genres: [p.category],
  }));
}
export function getBookById(id) {
  return new Promise((resolve) => {
    const book = books.find((b) => b.id === Number(id));
    setTimeout(() => resolve(book), 300); // Simulate network latency
  });
}