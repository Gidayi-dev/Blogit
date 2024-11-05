// import React, { useState } from "react";
// import { useMutation } from react-query;
// import apiBase from "./utils/api";
// // import { Toaster, toast } from 'sonner';
// import "./signIn.css";

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     usernameOrEmail: "",
//     password: "",
//   });

//   const { mutate } = useMutation({
//     mutationFn: async (userobj) => {
//       const response = await fetch(`${apiBase}/auth/SignIn`, {
//         method: "POST",
//         body: JSON.stringify(userobj),
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       })
//       console.log(response)
//     }
//   })

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   //   if (!emailAddress) {
//   //     return toast("Email address is required", {
//   //       theme: "toast-error",
//   //       duration: 3000,
//   //     });
//   //   }
//   // }
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Sign In Data:", formData);
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       {/* <Toaster position="top-right" richColors /> */}
//       <h2>Sign In</h2>
//       <input
//         type="text"
//         name="usernameOrEmail"
//         placeholder="Username or Email"
//         value={formData.usernameOrEmail}
//         onChange={handleChange}
//         required
//       />
//       <br /> <br />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//       <br /> <br />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { useMutation } from "react-query";
import apiBase from "./utils/api";
import "./signIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  // Mutation to handle sign-in API call
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

      return response.json(); // Return data for success handling
    },
    onError: (error) => {
      setErrorMessage(error.message); // Display error message from API
    },
    onSuccess: (data) => {
      alert("Sign-in successful!"); // Show success message or redirect
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.usernameOrEmail) {
      setErrorMessage("Username or email is required");
      return;
    }
    if (!formData.password) {
      setErrorMessage("Password is required");
      return;
    }

    // Submit the form using mutate
    mutate({emailAddress, password});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}

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
      <br /> <br />
      <button type="submit" disabled={isLoading} >
      {isLoading ? "Loading Please wait..." : "Sign In"}
      </button>
      {/* <p className="text">
        Don't have an account?{" "}
        <span>
          <Link to="/SignUp" className="link-text" />
          Create account here
        </span>
      </p> */}
    </form>
  );
};

export default SignIn;

