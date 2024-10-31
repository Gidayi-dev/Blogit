import Logo from "/src/assets/logo.png";
import "./header.css";

function Header() {
    return(
        <div className="header-section">
            <div className="logo"><img src={Logo} alt="Logo" /><br /><h2>Blogit</h2></div>
            <div className="login">
                <button className="button">Sign in</button>
                <button className="button">Get Started</button>
            </div>
        </div>
    )
}

export default Header;