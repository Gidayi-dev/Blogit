import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiBase from "../utils/api";
import "./write.css";
import Account from "./accountHeader";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the existing blog data using useQuery
  const {
    data: blog,
    isLoading: isFetching,
    error,
  } = useQuery(
    ["blog", id], // Use the blog id as part of the query key
    async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch blog details");
      return response.json();
    },
    {
      onSuccess: (data) => {
        setTitle(data.title);
        setContent(data.content);
      },
      onError: () => {
        toast.error("Failed to load blog");
      },
    },
  );

  // Mutation for updating the blog
  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedBlog) => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries(["blogs"]); // Refresh the blogs list
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error("Failed to update blog: " + error.message);
    },
  });

  // Handle form submission
  const handleUpdate = () => {
    if (!title || !content) {
      toast.error("Please fill in both title and content!");
      return;
    }
    const plainContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    mutate({ title, content: plainContent });
  };

  if (isFetching) return <div>Loading blog...</div>;
  if (error) return <div>Error loading blog</div>;

  return (
    <div className="write-section">
      <Account />
      <div className="write-container">
        <h2>Edit Your Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Edit your content here..."
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["blockquote", "code-block"],
              ["clean"], // Clears all content
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "link",
            "image",
            "video",
            "blockquote",
            "code-block",
          ]}
        />

        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading ? <b>Updating...</b> : <b>Update Blog</b>}
        </button>
      </div>
    </div>
  );
}

export default EditBlog;
