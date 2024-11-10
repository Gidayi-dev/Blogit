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

export async function fetchSingleBlog(req, res) {
  try {
    // res.send("Fetching a single note")
    const { id } = req.params;
    const blog = await prisma.blog.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!blog) {
      res.status(404).json({ message: "blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again later" });
  }
}

export async function fetchAllBlogs(req, res) {
  const { id } = req.params;
  try {
    const blogs = await prisma.blog.findMany({
      where: { id },
      include: {
        user: true,
      },
    });
    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getUserBlogs(req, res) {
  try {
    const userId = req.userId;
    const blogs = await prisma.blog.findMany({
      where: {
        owner: userId,
      },
    });
    res.status(200).json(blogs);
  } catch (e) {
    res
      .status(400)
      .json({ message: "There was an error please try again later..." });
  }
}

export async function deleteBlog(req, res) {
  try {
    const { blogId } = req.params;
    const userId = req.userId;
    await prisma.blog.delete({
      where: {
        id: blogId,
        owner: userId,
      },
    });
    res.status(200).json({ message: "notes deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again later.." });
  }
}
