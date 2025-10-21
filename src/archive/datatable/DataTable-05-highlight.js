import React, { useEffect, useState } from "react";
import { highlightMatch } from "../../utils";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
    //* Special handling: if sorting by 'company', use item.company.name (nested object)
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
            <th
              onClick={() => handleSort("name")}
              className={sortConfig.key === "name" ? "active-header" : ""}
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
              className={sortConfig.key === "email" ? "active-header" : ""}
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
              className={sortConfig.key === "company" ? "active-header" : ""}
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
          {!loading &&
            filtered.length > 0 &&
            filtered.length > 0 &&
            sortedData.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "even" : "odd"}>
                <td data-label="Name">{highlightMatch(user.name, query)}</td>
                <td data-label="Email">{highlightMatch(user.email, query)}</td>
                <td data-label="Company">
                  {highlightMatch(user.company.name, query)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
