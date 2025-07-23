import React, { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          <tr>hello</tr>
        </tbody>
      </table>
    </div>
  );
}
