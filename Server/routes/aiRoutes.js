import express from "express"
import auth from "../middleware/auth";
import { generateArticle } from "../controller/aiController";

const aiRouter = express.Router();

aiRouter.post("/generate-article" , auth ,generateArticle)

export default aiRouter;