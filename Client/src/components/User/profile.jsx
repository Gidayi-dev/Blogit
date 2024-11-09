import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const signedInUser = {
  id: 1,
  username: "Milly Gidayi",
  email: "gidayi@gmail.com",
  profilePicture: "https://via.placeholder.com/150",
  blogs: [
    { id: 1, title: "My First Blog", date: "2024-11-07" },
    { id: 2, title: "Learning React", date: "2024-11-06" },
  ],
};

const Profile = () => {
  const [userData, serUserData] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      setUserData(signedInUser);
      setUserBlogs(signedInUser.blogs);
    };
    fetchUserData();
  }, []);
  const handleBlogClick = (blogId) => {
    navigate(`/Profile`);
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {userData ? (
        <div className="profile-container">
          <div className="profile-info">
            <h2>{userData.username}</h2>
            <p>Email: {userData.email}</p>
            <p>Member Since: {userData.joinDate || "2024-01-01"}</p>
          </div>

          <div className="profile-picture-section">
            <h3>Profile Picture</h3>
            <div className="profile-picture-preview">
              <img
                src={profilePicture || userData.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <button onClick={handleSaveProfile}>Save Profile Picture</button>
          </div>

          <div className="user-blogs">
            <h3>Your Blogs</h3>
            {userBlogs.length > 0 ? (
              <div className="blogs-list">
                {userBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="blog-card"
                    onClick={() => handleBlogClick(blog.id)}
                  >
                    <h4>{blog.title}</h4>
                    <p>{blog.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't written any blogs yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
