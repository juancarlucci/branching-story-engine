import React, { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchData();
  }, []);

  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="table-wrapper">
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>Name!</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan="3">No results found</td>
            </tr>
          ) : null}
          {/* Render filtered data */}
          {!loading && filtered.length > 0 && (
            <tr>
              <td colSpan="3">Showing {filtered.length} results</td>
            </tr>
          )}
          {/* Map through filtered data */}
          {!loading && filtered.length > 0 &&
          filtered.length > 0 &&
          filtered.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
