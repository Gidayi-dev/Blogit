import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Account from "./accountHeader";
import "./allBlogs.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the list of blogs
  const navigate = useNavigate(); // Used for navigating to individual blog pages or other actions

  // Simulating fetching blogs from an API (replace with your actual API call)
  useEffect(() => {
    const fetchBlogs = () => {
      // Simulated blog data (replace with actual API request later)
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
        // Add more simulated blogs as needed
      ];
      setBlogs(fetchedBlogs);
    };

    fetchBlogs(); // Simulating the fetching process
  }, []);

  // Function to navigate to the individual blog page (you can create a separate blog page to view each blog)
  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div>
      <Account />
      <div className="blogs-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => handleBlogClick(blog.id)} // Navigate to individual blog
            >
              <h3>{blog.title}</h3>
              <p>By: {blog.author}</p>
              <p>{blog.date}</p>
              <p>{blog.content.slice(0, 100)}...</p>{" "}
              {/* Show preview of blog content */}
            </div>
          ))
        ) : (
          <p>No blogs available.</p> // Display this if there are no blogs
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
