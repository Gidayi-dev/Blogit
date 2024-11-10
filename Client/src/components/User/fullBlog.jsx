import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiBase from "../utils/api";
import DOMPurify from "dompurify";
import "./fullblog.css";
import Account from "./accountHeader";

function FullBlog() {
  const { id } = useParams();

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

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  const { title, content, updatedAt, user } = data;

  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "u",
      "a",
      "p",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "img",
      "blockquote",
      "code",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title"],
  });

  return (
    <div>
      <Account />
      <div className="full-blog">
        <h1>{title}</h1>
        <p>
          By {user.firstname} {user.lastname}
        </p>
        <p>Last updated: {new Date(updatedAt).toDateString()}</p>
        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
