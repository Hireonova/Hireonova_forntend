 
import React, { useState, useContext } from 'react';
import NavbarHome from './NavbarHome';
import Sidebar from './Sidebar';
import { ThemeContext } from '../contexts/ThemeContext';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar visibility
  const [activeComponent, setActiveComponent] = useState('PDFExtractor'); // State to control which component renders in the main area
  const { theme } = useContext(ThemeContext);

  // Function to toggle sidebar for small screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle component selection from sidebar
  const handleComponentSelect = (componentName) => {
    setActiveComponent(componentName);
    // On small screens, you might want to close the sidebar after selection
    if (window.innerWidth < 768) { // Example breakpoint
        setIsSidebarOpen(false);
    }
  };

  // Map component names to actual components
  const renderComponent = () => {
    switch (activeComponent) {
      case 'PDFExtractor':
        return <PDFExtractor />;
      // Add other cases for your components
      case 'AnotherComponent':
        // return <AnotherComponent />;
        return <div>Another Component Content</div>;
      default:
        return <PDFExtractor />; // Default to PDFExtractor
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <Navbar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to Navbar for hamburger */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onComponentSelect={handleComponentSelect}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">
          {renderComponent()}
          {/* Or if you are using React Router, this would be <Outlet /> */}
        </main>
      </div>
    </div>
  );
};

export default Layout;