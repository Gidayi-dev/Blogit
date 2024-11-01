import React, { useState } from 'react';
import "./signIn.css";

const SignIn = () => {
    const [formData, setFormData] = useState({
      usernameOrEmail: "",
      password: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Sign In Data:", formData);
      // Handle form submission logic here
    };
  
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
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
        <button type="submit">Sign In</button>
      </form>
    );
  };
  
  export default SignIn;
