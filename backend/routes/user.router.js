import express from "express";
import { signUp, login } from "../controllers/authController.js";
import { createPost } from "../controllers/postController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

export default userRouter;
