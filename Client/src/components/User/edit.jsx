import React, { useState, useEffect } from "react";
import apiBase from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${apiBase}/blogs/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (err) {
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        toast.success("Blog updated successfully!");
        navigate("/blogs");
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Update Blog</button>
    </form>
  );
}

export default EditBlog;
