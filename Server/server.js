import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// Use environment port or default
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("✅ Server is live and running!");
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
