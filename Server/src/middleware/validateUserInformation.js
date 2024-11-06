import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function validateUserInformation(req, res, next) {
  const { firstname, lastname, emailAddress, password } = req.body;

  // Field validation
  if (!firstname) {
    return res.status(400).json({ message: "Please Enter your First Name" });
  }
  if (!lastname) {
    return res.status(400).json({ message: "Please Enter your Last Name" });
  }
  if (!emailAddress) {
    return res.status(400).json({ message: "Please Enter your Email Address" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please Set your password" });
  }

  // Check if email already exists
  try {
    const userWithEmail = await client.user.findFirst({
      where: { emailAddress: emailAddress },
    });

    if (userWithEmail) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during validation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default validateUserInformation;
