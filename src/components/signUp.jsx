import React, { useState } from 'react';
import "./signUp.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError(""); // Clear error
      console.log("Sign Up Data:", formData);
      // Handle form submission logic here
    };
  
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  };
  
  export default SignUp;
