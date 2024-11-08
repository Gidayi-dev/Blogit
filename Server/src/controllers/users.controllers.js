import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();
export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, emailAddress, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await client.user.create({
      data: {
        firstname,
        lastname,
        emailAddress,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ message: "something went wrong" });
  }
};
