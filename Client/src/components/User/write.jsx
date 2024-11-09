// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useMutation } from "react-query";
// import apiBase from "../utils/api";
// import Account from "./accountHeader";
// import "./write.css";

// const Write = () => {
//   const [title, SetTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleTitleChange = (e) => SetTitle(e.target.value);

//   const { mutate, isLoading } = useMutation({
//     mutationFn: async (newBlog) => {
//       const response = await fetch(`http://localhost:4000/blogs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBlog),
//       });

//       return response.json();
//     },
//     onSuccess: () => {
//       alert("Blog post saved");
//     },
//   });
//   const handleSave = () => {
//     mutate({ title, content });
//   };
//   return (
//     <div className="write-section">
//       <Account />
//       <div className="write-container">
//         <h2>Write Your Blog</h2>
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={handleTitleChange}
//           className="title-input"
//         />
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           placeholder="Write your experience here...."
//           modules={{
//             toolbar: [
//               [{ header: "1" }, { header: "2" }, { font: [] }],
//               [{ size: [] }],
//               ["bold", "italic", "underline", "strike"],
//               [{ color: [] }, { background: [] }],
//               [{ list: "ordered" }, { list: "bullet" }],
//               ["link", "image", "video"],
//               ["clean"],
//             ],
//           }}
//           formats={[
//             "header",
//             "font",
//             "size",
//             "bold",
//             "italic",
//             "underline",
//             "strike",
//             "color",
//             "background",
//             "list",
//             "bullet",
//             "link",
//             "image",
//             "video",
//           ]}
//         />
//         <button
//           onClick={handleSave}
//           disabled={isLoading}
//           className="save-button"
//         >
//           {isLoading ? <b>Posting...</b> : <b>Post</b>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Write;

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill editor style
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiBase from "../utils/api"; // Adjust according to your actual API base
import Account from "./accountHeader"; // Assuming you have an account header component
import "./write.css"; // Ensure you have a corresponding CSS file for styles

const Write = () => {
  const [title, SetTitle] = useState(""); // To store the blog title
  const [content, setContent] = useState(""); // To store the blog content
  const navigate = useNavigate();

  const handleTitleChange = (e) => SetTitle(e.target.value);

  // Mutation to handle the post request for creating a blog
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

  // Function to handle saving the blog
  const handleSave = () => {
    if (!title || !content) {
      alert("Please fill in both title and content!");
      return;
    }
    mutate({ title, content });
  };

  return (
    <div className="write-section">
      <Account /> {/* Account component, adjust according to your structure */}
      <div className="write-container">
        <h2>Write Your Blog</h2>

        {/* Blog Title Input */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={handleTitleChange}
          className="title-input"
        />

        {/* React Quill for blog content */}
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your experience here...."
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

        {/* Post Button */}
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

// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useMutation } from "react-query";
// import Account from "./accountHeader";
// import apiBase from "./utils/api";
// import "./write.css";

// const Write = () => {
//   const [title, setTitle] = useState(""); // Corrected setter function name
//   const [content, setContent] = useState("");

//   // Mutation function to handle posting a blog
//   const { mutate, isLoading } = useMutation({
//     mutationFn: async (blog) => {
//       const response = await fetch(`${apiBase}/blogs`, {
//         method: "POST",
//         body: JSON.stringify(blog), // Corrected from 'note' to 'blog'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error("Failed to post blog");
//       return response.json();
//     },
//     onSuccess: () => {
//       alert("Blog posted successfully!");
//     },
//     onError: () => {
//       alert("Failed to post blog.");
//     },
//   });

//   // Handle title input changes
//   const handleTitleChange = (e) => setTitle(e.target.value);

//   // Handle submit for blog
//   const handleSubmitBlogs = (e) => {
//     e.preventDefault();

//     // Validate input
//     if (!title) return alert("Title is required");
//     if (!content) return alert("Write your blog content");

//     // Prepare blog data and call mutate to post blog
//     const blog = {
//       title,
//       content,
//     };
//     mutate(blog); // Trigger the mutation to post the blog
//   };

//   return (
//     <div className="write-section">
//       <Account />
//       <div className="write-container">
//         <h2>Write Your Blog</h2>
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={handleTitleChange}
//           className="title-input"
//         />
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           placeholder="Write your experience here...."
//           modules={{
//             toolbar: [
//               [{ header: "1" }, { header: "2" }, { font: [] }],
//               [{ size: [] }],
//               ["bold", "italic", "underline", "strike"],
//               [{ color: [] }, { background: [] }],
//               [{ list: "ordered" }, { list: "bullet" }],
//               ["link", "image", "video"],
//               ["clean"],
//             ],
//           }}
//           formats={[
//             "header",
//             "font",
//             "size",
//             "bold",
//             "italic",
//             "underline",
//             "strike",
//             "color",
//             "background",
//             "list",
//             "bullet",
//             "link",
//             "image",
//             "video",
//           ]}
//         />
//         <button onClick={handleSubmitBlogs} disabled={isLoading} className="save-button">
//           {isLoading ? "Posting..." : <b>Post</b>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Write;
