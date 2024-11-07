function validateBlog(req, res, next) {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });
  if (!content) return res.status(400).json({ message: "write your blog" });
  // if (visibility !== "public" && visibility !== "private") return res.status(400).json ({ message: "visibility can either be public or private" })
  next();
}

export default validateBlog;
