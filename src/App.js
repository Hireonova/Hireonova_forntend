// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BackgroundGrid from './components/Background';
import Footer from './components/Footer';
import JobSearch from './components/JobSearch';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Hero from './pages/Hero';
import Login from './pages/Login';
import About from './pages/About';
import Documentation from './pages/Documentation';
import ProtectedLayout from './components/ProtectedLayout';
 
import FItJobForYou from './components/FItJobForYou';
import DashboardComponent from './components/DashboardComponent';
import PDFExtractor from './components/PDFExtractor';
import LikedJobs from './components/LikedJobs';
import CvtoSite from './components/CvtoSite';

// Auth check wrapper
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
                <JobSearch />
                <Footer />
              </BackgroundGrid>
            </section>
          }
        />

        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/docs" element={<Documentation />} />

        {/* Protected Layout with sidebar */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardComponent />} />
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="upload-resume" element={<PDFExtractor />} />
          <Route path="job-fit" element={<FItJobForYou />} />
          <Route path="liked-jobs" element={<LikedJobs />} />
           <Route path="site-builder" element={<CvtoSite />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
