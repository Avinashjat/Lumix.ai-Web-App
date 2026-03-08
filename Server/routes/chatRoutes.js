import express from "express";
import { chatAI } from "../controller/chatController.js";
import { upload } from "../config/multer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/chat", auth, upload.single("file"), chatAI);

export default router;
