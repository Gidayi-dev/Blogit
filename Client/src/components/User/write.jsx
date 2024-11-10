import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiBase from "../utils/api";
import Account from "./accountHeader";
import "./write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newBlog) => {
      const response = await fetch(`${apiBase}/blogs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to post blog");
      }

      return response.json();
    },
    onSuccess: () => {
      alert("Blog post saved!");
      navigate(`/blogs`);
    },
    onError: (error) => {
      alert("Failed to post blog: " + error.message);
    },
  });

  const cleanContent = (dirtyContent) => {
    return DOMPurify.sanitize(dirtyContent, {
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
  };

  const handleSave = () => {
    if (!title || !content) {
      alert("Please fill in both title and content!");
      return;
    }

    const cleanedContent = cleanContent(content);

    mutate({ title, content: cleanedContent });
  };

  return (
    <div className="write-section">
      <Account />
      <div className="write-container">
        <h2>Write Your Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={handleTitleChange}
          className="title-input"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your content here..."
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["blockquote", "code-block"],
              ["clean"],
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
            "paragraph",
          ]}
        />

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading ? <b>Saving...</b> : <b>Save Blog</b>}
        </button>
      </div>
    </div>
  );
};

export default Write;
