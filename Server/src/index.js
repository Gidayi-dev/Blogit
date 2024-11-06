import express from "express";
import cors from "cors";
import { registerUser } from "./controllers/users.controllers.js";
import { signInUser } from "./controllers/auth.controllers.js";
import validateUserInformation from "./middleware/validateUserInformation.js";

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
//routes
app.post("/users", validateUserInformation, registerUser);
app.post("/auth/SignIn", signInUser);
//server
app.listen(4000, () => console.log("Server running..."));
