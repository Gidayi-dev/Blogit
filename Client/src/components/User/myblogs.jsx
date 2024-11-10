import { useQuery, useMutation, useQueryClient } from "react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import apiBase from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./myblogs.css";

const fetchBlogs = async () => {
  const response = await fetch(`${apiBase}/blogs/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
};

const deleteBlog = async (blogId) => {
  const response = await fetch(`${apiBase}/blogs/${blogId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return blogId;
};

function BlogsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery("blogs", fetchBlogs);

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: (blogId) => {
      queryClient.setQueryData("blogs", (prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogId),
      );
      toast.success("Blog deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirmDelete) return;

    deleteMutation.mutate(blogId);
  };

  const handleEdit = (blogId) => {
    navigate(`/Write/${blogId}`);
  };

  return (
    <div className="blogs-page">
      <nav className="nav">
        <Link to="/Hero" className="nav-links">
          Home
        </Link>
        <Link to="/blogs" className="nav-links">
          All Blogs
        </Link>
        <Link to="/Write" className="nav-links">
          Write
        </Link>
        <Link to="/Profile" className="nav-links">
          Profile
        </Link>
        <Link to="/Account" className="nav-links">
          <h2>My Blogs</h2>
        </Link>
      </nav>

      <div className="blogs-container">
        {isLoading && <p>Loading blogs, please wait...</p>}
        {isError && <p>Error: {error.message}</p>}
        {!isLoading && !isError && blogs?.length === 0 && (
          <p>You don't have any blogs yet. Click here to create one.</p>
        )}

        {!isLoading && !isError && blogs?.length > 0 && (
          <div className="blogs-list">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-item">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>

                <div className="blog-actions">
                  <FaEdit
                    className="icon edit-icon"
                    onClick={() => handleEdit(blog.id)}
                    title="Edit Blog"
                  />

                  <FaTrash
                    className="icon delete-icon"
                    onClick={() => handleDelete(blog.id)}
                    title="Delete Blog"
                  />
                </div>

                <Link to={`/blogs/${blog.id}`} className="view-blog">
                  View Blog
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsPage;
