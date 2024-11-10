import React, { useState } from "react";

function Input({ onImageUpload }) {
  const [image, setImage] = useState("");

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Gidayi"); // Your Cloudinary upload preset

    fetch("https://api.cloudinary.com/v1_1/dzl6ktrtc/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.secure_url);
        if (onImageUpload) {
          onImageUpload(data.secure_url); // Pass the URL back to the parent component
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      });
  };

  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e.target.files)} />
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
}

export default Input;
