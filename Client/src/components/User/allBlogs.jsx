import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./accountHeader";
import "./allBlogs.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = () => {
      const fetchedBlogs = [
        {
          id: 1,
          title: "My First Blog",
          author: "Milly Gidayi",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum pariatur eveniet, hic dicta consequuntur sit aspernatur iste ab deleniti quia voluptatem, nemo et quae eum? Id aspernatur cum ad impedit?",
          date: "2024-11-07",
        },
        {
          id: 2,
          title: "A Day in the Life",
          author: "John Doe",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum pariatur eveniet, hic dicta consequuntur sit aspernatur iste ab deleniti quia voluptatem, nemo et quae eum? Id aspernatur cum ad impedit?",
          date: "2024-11-06",
        },
      ];
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="blogs-container">
      <Account />
      <div className="blogs-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => handleBlogClick(blog.id)}
            >
              <h3>{blog.title}</h3>
              <p>By: {blog.author}</p>
              <p>{blog.date}</p>
              <p>{blog.content.slice(0, 100)}...</p>{" "}
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
