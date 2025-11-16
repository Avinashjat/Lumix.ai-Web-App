import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware , requireAuth} from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",  // Frontend URL
    credentials: true,
  })
);

// Use environment port or default
const PORT = 6467;

await connectCloudinary()

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


// Routes
app.get("/", (req, res) => {
  res.send("✅ Server is live and running!");
});

// app.use(requireAuth())

app.use('/api/ai' , aiRouter)
app.use('/api/user' , userRouter)

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
