import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
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

const client = new PrismaClient();
app.post("/users", async (req, res) => {
  try {
    // console.log(req.body);
    const { firstname, lastname, email, password } = req.body;
    if (!firstname) {
      res.status(400).json({ message: "Please Enter your First Name" });
      return;
    }
    if (!lastname) {
      res.status(400).json({ message: "Please Enter your Last Name" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "Please Enter your Email Address" });
    }
    if (!password) {
      res.status(400).json({ message: "Please Set your password" });
      return;
    }
    const userWithEmail = await client.user.findFirst({
      where: { emailAddress: email },
    });
    if (userWithEmail) {
      res.status(400).json({ message: "Email address already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await client.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        emailAddress: email,
        password: hashedPassword,
      },
    });
    // console.log("I was executed")
    res.status(201).json(newUser);
  } catch (e) {
    //res.status(500).json({ meesage: e.message}); //explains the error
    res.status(500).json({ message: e.message });
  }
});

app.post("/auth/SignIn", async (req, res) => {
  try {
    // Read the email address and the plain password from the client/user
    const { emailAddress, password } = req.body;

    // Check if the user exists: querying the database against the email
    const user = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }
    //successfully signed in, so generate a token, save the id in there
    const token = jwt.sign(user, process.env.JWT_SECRET);

    // res
    //   .status(200)
    //   .json({
    //     message: "Login successfully",
    //     user: { id: user.id, emailAddress: user.emailAddress },
    //   });
    //authentication failure if user does not exist
    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    console.error("SignIn error:", e);
    res.status(500).json({ message: "Something went wrong please try again" });
  }
});
app.listen(4000, () => console.log("Server running..."));
