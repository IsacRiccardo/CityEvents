const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create write stream for logs
const logFile = path.join(logsDir, `server-${new Date().toISOString().split('T')[0]}.log`);
const logStream = fs.createWriteStream(logFile, { flags: "a" });

// Helper function to log with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + "\n");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend files

// Dummy event data
const events = [
  {
    id: 1,
    name: "Timișoara Jazz Festival",
    latitude: 45.7489,
    longitude: 21.2087,
    street: "Piața Operei 2",
    date: "2025-03-18",
    time: "20:00",
    duration: "3 hours"
  },
  {
    id: 2,
    name: "Spring Market at Piața Libertății",
    latitude: 45.7614,
    longitude: 21.2301,
    street: "Piața Libertății 1",
    date: "2025-03-18",
    time: "09:00",
    duration: "6 hours"
  },
  {
    id: 3,
    name: "Opera House Classical Concert",
    latitude: 45.7459,
    longitude: 21.2251,
    street: "Piața Operei 2",
    date: "2025-03-19",
    time: "19:00",
    duration: "2 hours"
  },
  {
    id: 4,
    name: "Art Expo at Contemporul Museum",
    latitude: 45.7515,
    longitude: 21.2181,
    street: "Strada Popa Șapcă 1",
    date: "2025-03-19",
    time: "10:00",
    duration: "4 hours"
  }
];

// Routes
app.get("/api/events", (req, res) => {
  log(`GET /api/events - ${req.ip}`);
  res.json(events);
});

// Health check
app.get("/health", (req, res) => {
  log(`GET /health - OK`);
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  log(`404 - ${req.method} ${req.path}`);
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  log(`ERROR: ${err.message}`);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  log(`✓ Server running on http://localhost:${PORT}`);
  log(`✓ Events API: http://localhost:${PORT}/api/events`);
  log(`✓ Health check: http://localhost:${PORT}/health`);
  log(`✓ Logs saved to: ${logFile}`);
});
