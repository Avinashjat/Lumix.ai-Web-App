import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(clerkMiddleware());

// ✅ JSON only where needed
app.use("/api/ai", express.json(), aiRouter);
app.use("/api/user", express.json(), userRouter);

app.get("/", (req, res) => {
  res.send("Server is live and running!");
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
