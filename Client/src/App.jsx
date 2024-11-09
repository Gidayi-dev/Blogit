import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/Hero";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Account from "./components/User/accountHeader";
import Write from "./components/User/write";
import AllBlogs from "./components/User/allBlogs";
import Profile from "./components/User/profile";
import FullBlog from "./components/User/fullBlog.jsx";
import Feed from "./components/User/feed.jsx";
import BlogsPage from "./components/User/myblogs.jsx";
import EditBlog from "./components/User/edit.jsx";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
              </>
            }
          />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Write" element={<Write />} />
          <Route path="/AllBlogs" element={<AllBlogs />} />
          <Route path="/BlogsPage" element={<BlogsPage />} />
          <Route path="/EditBlog" element={<EditBlog />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/blogs/:id" element={<FullBlog />} />
          <Route path="/blogs" element={<Feed />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
