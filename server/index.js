const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());

let candidates = [];

fs.readFile(path.join(__dirname, "data", "form-submissions.json"), "utf8", (err, data) => {
  if (err) {
    console.error("Error loading candidate data:", err);
  } else {
    try {
      const raw = JSON.parse(data);
candidates = raw.map((c, idx) => ({ ...c, id: idx.toString() }));

      console.log(`Loaded ${candidates.length} candidates`);
    } catch (e) {
      console.error("Invalid JSON format:", e);
    }
  }
});

app.get("/candidates", (req, res) => {
  res.json(candidates);
});

app.get("/candidates/:id", (req, res) => {
  const candidate = candidates.find(c => c.id === req.params.id);
  if (candidate) {
    res.json(candidate);
  } else {
    res.status(404).json({ message: "Candidate not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
