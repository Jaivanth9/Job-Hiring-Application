import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [shortlist, setShortlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);

  const handleShortlist = (candidate) => {
    if (!shortlist.some((c) => c.id === candidate.id)) {
      setShortlist([...shortlist, candidate]);
    }
  };

  const removeFromShortlist = (candidateId) => {
    setShortlist(shortlist.filter((c) => c.id !== candidateId));
  };

  const filtered = candidates.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
        🧠 100B Jobs - Candidate Shortlisting App
      </h1>
      <div className="App">
        <div className="column">
          <h2>All Candidates ({filtered.length})</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {filtered.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> - {c.role || "No Role"}
                <button onClick={() => handleShortlist(c)}>Shortlist</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="column">
          <h2>Shortlisted ({shortlist.length})</h2>
          <ul>
            {shortlist.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> - {c.role || "No Role"}
                <button
                  onClick={() => removeFromShortlist(c.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#dc3545",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
