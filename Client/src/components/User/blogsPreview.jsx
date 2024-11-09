import React from "react";
import { useNavigate } from "react-router-dom";
import { faUser } from "react-icons/fa";

function BlogPreview({ id, title, content, authorName, authorImgUrl }) {
  const navigate = useNavigate();
  function handleNavigateToFullArticle() {
    if (!id) return;
    navigate(`/blog/${id}`);
  }
  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <p>{content}</p>
      <div>{authorImgUrl ? <img src={authorImgUrl} /> : <faUser />}</div>
      <button onClick={handleNavigateToFullArticle}>Read</button>
    </div>
  );
}
