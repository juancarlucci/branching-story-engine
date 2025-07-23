import React, { useEffect, useState, useCallback } from "react";
import { highlightMatch } from "../utils";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const getValue = (item, key) => {
    //* Safely retrieve the value to be sorted by
    //* Special handling: handles nested fields (like company.name)
    //* For all other keys (e.g., 'name', 'email'), access directly
    return key === "company"
      ? item.company?.name?.toLowerCase?.() || ""
      : item[key]?.toLowerCase?.() || "";
  };

  const sortedData = [...filtered].sort((a, b) => {
    //* Create a shallow copy of filtered to avoid mutating state
    //* Compare two items based on the current sort key and direction
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    //* Perform lexicographical comparison (a-z)
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0; // equal values: no change in order
  });

  function handleSort(key) {
    //* oggle sort direction on repeated click; otherwise default to ascending
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  //* Handles arrow key navigation for keyboard users.
  const handleKeyDown = useCallback(
   //* If handleKeyDown is a new function every render, this effect:
   //* Runs on every render 🐌
   //* Re-attaches the event listener every time 😓
   //* By wrapping handleKeyDown in useCallback, you ensure:

   //* It’s referentially stable (same reference across renders)
   //* Your useEffect only runs when it needs to (e.g., data length changes)
    (e) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => Math.min(prev + 1, sortedData.length - 1));
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [sortedData.length]
  );

  useEffect(() => {
    //* This allows the table to be navigated with arrow keys
    window.addEventListener("keydown", handleKeyDown);

    //* Cleans up on unmount to avoid memory leaks or stacking listeners.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, sortedData.length]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  //* Reset row highlight and scroll to top on page change.
  //* Enhances UX consistency across paginated views.
  useEffect(() => {
    setActiveIndex(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div
      className="keyboard-table-wrapper"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        aria-label="Search users by name"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}>
        {/* Tells screen readers to read this content aloud when currentPage changes. 
          left: '-9999px' Visually hides it, but keeps it accessible */}
        Page {currentPage}
      </div>
      <div aria-live="polite" className="search-status" role="status">
        {loading
          ? "Loading results..."
          : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`}
      </div>
      <table className="data-table" role="table" aria-label="User data table">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("name")}
              className={`sortable ${sortConfig.key === 'name' ? 'active-header' : ''}`}
            >
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "⇅"}
            </th>
            <th
              onClick={() => handleSort("email")}
              className={`sortable ${sortConfig.key === 'email' ? 'active-header' : ''}`}
            >
              Email{" "}
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "⇅"}
            </th>
            <th
              onClick={() => handleSort("company")}
              className={`sortable ${sortConfig.key === 'company' ? 'active-header' : ''}`}
            >
              Company{" "}
              {sortConfig.key === "company"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "⇅"}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                Loading data...
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>No results found</td>
            </tr>
          ) : null}
          {/* Map through filtered data */}
          {!loading &&
            filtered.length > 0 &&
            filtered.length > 0 &&
            paginatedData.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? "even" : "odd"} ${
                  index === activeIndex ? "active-row" : ""
                }`}
              >
                <td data-label="Name">{highlightMatch(user.name, query)}</td>
                <td data-label="Email">{highlightMatch(user.email, query)}</td>
                <td data-label="Company">
                  {highlightMatch(user.company.name, query)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              p < Math.ceil(sortedData.length / itemsPerPage) ? p + 1 : p
            )
          }
          disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
