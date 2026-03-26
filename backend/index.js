import express from "express";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/db.js";
import userRouter from "./routes/user.router.js";
import dotenv from "dotenv";
import postRouter from "./routes/post.router.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
dbConnect();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://facebook-clone-echu.vercel.app"], // ✅ your frontend
    credentials: true, // ✅ allow cookies
  }),
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("app is running");
});
