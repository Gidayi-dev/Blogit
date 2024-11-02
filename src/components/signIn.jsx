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
       //console.log('Form data submitted:' formData);

    };

    return(
        <form onSubmit={handleSubmit}>
            <label>
                FirstName
                <br />
                <input 
                type='text'
                name='name'
                value={formData.FirstName}
                onChange={handleChange}
                />
            </label>
            <br />
            <br />
            <label>
            LastName
            <br />
                <input 
                type='text'
                name='name'
                value={formData.LastName}
                onChange={handleChange}
                />
            </label>
            <br />
            <br />
            <label>
                EmailAddress
                <br />
                <input
                type='email'
                name='email'
                value={formData.EmailAddress}
                onChange={handleChange}
                />
                <br />
                <br />
                <button type='submit'>Create your account</button>
                <br /> <br />
                <button type='submit'>Login</button>
            </label>
        </form>
    )
}

export default SignIn;