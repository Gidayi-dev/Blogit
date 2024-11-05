import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/Hero";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

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
                {/* <Header /> */}
                <Hero />
              </>
            }
          />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
