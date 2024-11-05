import { useNavigate } from "react-router-dom";
import "./hero.css";

function Hero() {
  const navigate = useNavigate();

  const handleCreateBlogClick = () => {
    navigate("/signup");
  };

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Stories, Skills & Creative Journeys</h1>
        <p>
          Welcome to a space where creativity, growth, and discovery come
          together! Dive into a variety of topics, from personal development and
          productivity tips to creative pursuits and storytelling. Join the
          journey and find inspiration for your own path.
        </p>
        <button className="explore" onClick={handleCreateBlogClick}>
          Create Your Blog
        </button>
      </div>
    </div>
  );
}

export default Hero;
