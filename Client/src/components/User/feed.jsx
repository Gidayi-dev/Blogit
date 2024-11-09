import React from "react";
import { useQuery } from "react-query";
import blogs from "../data/blogs";
import apiBase from "../utils/api";
import { Link } from "react-router-dom";

function Feed() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  const blogData = data?.length ? data : blogs;

  return (
    <div className="feed-container">
      {blogData.length > 0 ? (
        blogData.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <div className="author-details">
              <div>
                <span>
                  {blog.user?.firstname} {blog.user?.lastname}
                </span>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <Link to={`/blogs/${blog.id}`} className="read-more">
              Read more
            </Link>
          </div>
        ))
      ) : (
        <h2>No blogs available</h2>
      )}
    </div>
  );
}

export default Feed;
