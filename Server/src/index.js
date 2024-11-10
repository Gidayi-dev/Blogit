import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registerUser } from "./controllers/users.controllers.js";
import { signInUser } from "./controllers/auth.controllers.js";
import {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  getUserBlogs,
  deleteBlog,
} from "./controllers/blogs.controllers.js";
import validateUserInformation from "./middleware/validateUserInformation.js";
import verifyToken from "./middleware/verifyToken.js";
import validateBlog from "./middleware/validateBlog.js";

const app = express();
//register middlewares
app.use(express.json());
//whenever form is used
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
//routes
app.post("/users", validateUserInformation, registerUser);
app.post("/auth/SignIn", signInUser);
app.post("/blogs", verifyToken, validateBlog, createBlog);
app.get("/blogs/user", verifyToken, getUserBlogs);
app.get("/blogs/:id", verifyToken, fetchSingleBlog);
app.get("/blogs", verifyToken, fetchAllBlogs);
app.delete("/blogs/:blogId", verifyToken, deleteBlog);
//server
app.listen(4000, () => console.log("Server running..."));
