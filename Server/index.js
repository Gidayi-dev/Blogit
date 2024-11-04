import express from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const client = new PrismaClient();
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const emailAddress = req.body.emailAddress;
    // const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await client.user.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        emailAddress: emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (e) {
    //res.status(500).json({ meesage: e.message}); //explains the error
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later.." });
  }
});

app.listen(4000, () => console.log("Server running..."));
