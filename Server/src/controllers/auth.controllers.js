import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();
export const signInUser = async (req, res) => {
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
    const token = jwt.sign(user.id, process.env.JWT_SECRET);

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
    res.status(500).json({ message: "Something went wrong" });
  }
};
