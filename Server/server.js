import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware , requireAuth} from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";


const app = express();

// Use environment port or default
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


// Routes
app.get("/", (req, res) => {
  res.send("✅ Server is live and running!");
});

app.use(requireAuth())

app.use('/api/ai' , aiRouter)

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
