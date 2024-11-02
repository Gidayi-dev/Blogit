import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route with Header and Hero */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />

        {/* Separate routes for SignIn and SignUp without Header or Hero */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
