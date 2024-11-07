import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import Account from './accountHeader';
import './write.css';

const Write = () => {
    const [title, SetTitle] = useState("");
    const [content, setContent] =useState("");

    const handleTitleChange = (e) => SetTitle(e.target.value);

    const{ mutate } = useMutation({
        mutationFn: async (newBlog) => {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBlog),
            });
            return response.json();
        },
        onSuccess: () => {
            alert("Blog post saved");
        },
    });
    const handleSave = () => {
        mutate({ title, content });
    };
    return(
        <div className='write-section'>
            <Account />
        <div className='write-container'>
            
            <h2>Write Your Blog</h2>
            <input 
            type="text" 
            placeholder='Blog Title'
            value={title}
            onChange={handleTitleChange}
            className='title-input'
            />
            <ReactQuill 
              value={content}
              onChange={setContent}
              placeholder='Write your experience here....'
              modules={{
                  toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: []}],
                      [{ size: []}],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: []}, { background: [] }],
                      [{ list: "ordered"}, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"]
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
            <button onClick={handleSave} className='save-button'><b>Post</b></button>
        </div>
        </div>
    );
};

export default Write;