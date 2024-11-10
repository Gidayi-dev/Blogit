import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./accountHeader";
import "./allBlogs.css";
import apiBase from "../utils/api"; // Ensure you have the correct path for your API base URL

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${apiBase}/blogs`, {
        method: "GET",
        credentials: "include", // Include credentials if your API requires authentication
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return <h2>Loading blogs...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="blogs-container">
      <div className="blogs-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => handleBlogClick(blog.id)}
            >
              <h3>{blog.title}</h3>
              <p>
                By: {blog.user.firstname} {blog.user.lastname}
              </p>
              <p>{new Date(blog.updatedAt).toDateString()}</p>
              <p>{blog.content.slice(0, 100)}...</p>
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
