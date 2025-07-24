import React, { useEffect, useState } from "react";

export default function BookDetail() {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();

    async function fetchBook() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        const formatted = {
          id: data.id,
          title: data.title,
          author: data.brand,
          summary: data.description,
          coverUrl: data.thumbnail,
          genres: [data.category],
        };
        setBook(formatted);
      } catch (e) {
        console.error("Error loading book", e);
      }
    }

    fetchBook();
  }, []);

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <img
        src={book.coverUrl}
        alt={`Cover of ${book.title}`}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <h1>{book.title}</h1>
      <h2 style={{ color: "#bbb" }}>{book.author}</h2>
      <p>{book.summary}</p>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {book.genres.map((tag) => (
          <span
            key={tag}
            style={{
              backgroundColor: "#444",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
