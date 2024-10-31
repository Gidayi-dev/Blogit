import React, { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Logo from "/src/assets/logo.png";
import "./header.css";

const Header = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    return(
        <div className="header-section">
            <div className="logo"><img src={Logo} alt="Logo" /><br /><h2>Blogit</h2></div>
            <div className="login">
                <button className="button" onClick={() => setIsSignIn(true)}>Sign in</button>
                <button className="button" onClick={() => setIsSignUp(true)}>Get Started</button>
            </div>
            {/* <div className="form-container">
            {isSignUp ? <SignUp /> : <SignIn />}
            </div> */}
        </div>
    )
}

export default Header;