import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiBase from "./utils/api";
import "./signIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch(`${apiBase}/auth/SignIn`, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-in failed");
      }

      return response.json();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      navigate("/account");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.usernameOrEmail || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    mutate(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <br />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <input
        type="text"
        name="usernameOrEmail"
        placeholder="Username or Email"
        value={formData.usernameOrEmail}
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
      <br />
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignIn;
