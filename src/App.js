import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components & Pages
import BackgroundGrid from './components/Background';
import Footer from './components/Footer';
import JobSearch from './components/JobSearch';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Home from './pages/Home'; // Assuming this is your dashboard or main app after login
import About from './pages/About';
import Documentation from './pages/Documentation';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page "/" */}
        <Route
          path="/"
          element={
            <section className="overflow-hidden">
              <BackgroundGrid>
                <Navbar />
                <Hero />
                <TechStack />
                <JobSearch></JobSearch>
                <Footer />
              </BackgroundGrid>
            </section>
          }
        />

        {/* Protected Home Page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
          <Route path='/aboutus' element={<About/>}/>   
          <Route path='/docs' element={<Documentation/>}/>   
               
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
