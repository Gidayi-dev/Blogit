import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function createBlog(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        owner: userId,
      },
    });
    res.status(201).json(newBlog);
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
}
