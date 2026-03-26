import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  createComment,
  createPost,
  getAllPosts,
  likePost,
} from "../controllers/postController.js";
const postRouter = express.Router();

// create post
postRouter.post("/createPost", auth, createPost);

//comment on Post
postRouter.post("/createComment/:postId", auth, createComment);

//like on post

postRouter.post("/likePost/:postId", auth, likePost);

//get all post
postRouter.get("/getAllPosts", auth, getAllPosts);

export default postRouter;
