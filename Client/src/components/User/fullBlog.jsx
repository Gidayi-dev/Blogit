import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiBase from "../utils/api";

function FullBlog() {
  const { id } = useParams();

  // Fetch the specific blog by its ID
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    },
  });

  // Loading state
  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  // Error state
  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  // Destructure data
  const { title, content, updatedAt, user } = data;

  // Render the content if data is successfully fetched
  return (
    <div className="full-blog">
      <h1>{title}</h1>
      <p>
        By {user.firstname} {user.lastname}
      </p>
      <p>Last updated: {new Date(updatedAt).toDateString()}</p>
      <div className="blog-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default FullBlog;
