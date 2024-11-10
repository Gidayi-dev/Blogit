import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiBase from "../utils/api";
import Account from "./accountHeader";
import Input from "../utils/input";
import "./write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const quillRef = useRef(null);
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

  const handleSave = () => {
    if (!title || !content) {
      alert("Please fill in both title and content!");
      return;
    }
    mutate({ title, content });
  };

  const handleImageUpload = (imageURL) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    editor.insertEmbed(range.index, "image", imageURL);
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

        <Input onImageUpload={handleImageUpload} />

        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          placeholder="Write your experience here..."
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
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
          ]}
        />

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading ? <b>Posting...</b> : <b>Post</b>}
        </button>
      </div>
    </div>
  );
};

export default Write;
