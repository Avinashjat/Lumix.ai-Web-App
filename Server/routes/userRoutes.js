import express from "express";
import { requireAuth } from "@clerk/express";
import auth from "../middleware/auth.js";

import {
  getUserCreations,
  getPublishedCreations,
  toggleLikeCreations,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/get-user-creations", requireAuth(), getUserCreations);

userRouter.get("/get-published-creations", auth, getPublishedCreations);

userRouter.post("/toggle-likes-creations", auth, toggleLikeCreations);

export default userRouter;
