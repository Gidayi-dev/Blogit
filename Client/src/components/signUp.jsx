import React, { useState } from "react";
import { useMutation } from "react-query";
import apiBase from "./utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const redirect = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async function (newUser) {
      const response = await fetch(`http://localhost:4000/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({}),
        },
      });
      // console.log(response);

      if (response === false) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => redirect("/SignIn"),
    onError: () => setError("Error signing up. Please try again."),
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
    // console.log("Sign Up Data:", formData);
    mutate(formData);
  };

  return (
    <div className="sign-up">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br /> <br />
        <input
          type="text"
          name="lastname"
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading Please wait..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
