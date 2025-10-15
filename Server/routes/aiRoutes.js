import express from "express"
import auth from "../middleware/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeBackground, removeObject, resumeReview } from "../controller/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article" , auth ,generateArticle)
aiRouter.post("/generate-blog-title" , auth ,generateBlogTitle)
aiRouter.post("/generate-image" , auth ,generateImage)
aiRouter.post("/remove-background" , auth ,removeBackground)
aiRouter.post("/remove-object" , auth ,removeObject)
aiRouter.post("/resume-review" , auth ,resumeReview)

export default aiRouter;