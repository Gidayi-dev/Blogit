import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();
export const signInUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Wrong email address or password" });
    }
    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (e) {
    console.error("SignIn error:", e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
