
import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(""); 
    console.log("Sign Up Data:", formData);
    
  };

  return (
    <div className="sign-up">
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="Name"
        placeholder="First name"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <br /> <br />
      <input
        type="text"
        name="Name"
        placeholder="Last name"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <br /> <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br /> <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <br /> <br />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <br /> <br />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUp;
