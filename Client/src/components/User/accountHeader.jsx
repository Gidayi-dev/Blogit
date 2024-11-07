import { Link } from "react-router-dom";
import "./account.css";

function Account() {
  return (
    <div className="head">
      <nav className="nav">
        <Link to="/Hero" className="nav-links">
          Home
        </Link>
        <Link to="/AllBlogs" className="nav-links">
          All Blogs
        </Link>
        <Link to="/Write" className="nav-links">
          Write
        </Link>
        <Link to="/Profile" className="nav-links">
          Profile
        </Link>
      </nav>
      <br />
      <Link to="/Account" className="nav-links">
        <h2>My Blogs</h2>
      </Link>
    </div>
  );
}

export default Account;
