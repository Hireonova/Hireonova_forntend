import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PDFExtractor from '../components/PDFExtractor';
import BackgroundGrid from '../components/Background';
import CvtoSite from '../components/CvtoSite';
import DashboardComponent from '../components/DashboardComponent';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeSearch from '../components/ResumeSearch';
import LikedJobs from '../components/LikedJobs';
 

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('PDFExtractor');
  const [isDark, setIsDark] = useState(false);
     useEffect(() => {
        document.title ="Dashboard";
      }, );
 
  const NAVBAR_HEIGHT_PX = 80; // Approximate height of your navbar with py-4 and content
  const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px (w-64)

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window is available and set initial desktop state
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
   
    
    
    checkDesktop();
    
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    if (!storedUsername || !storedToken) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
      setEmail(storedEmail);
    }

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }

    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      // On larger screens, ensure sidebar is closed if it was opened on mobile
      if (desktop && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, isSidebarOpen]); // Added isSidebarOpen to dependencies

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const renderActiveComponent = () => {
    const components = {
      'Dashboard': <DashboardComponent />,
      'PDFExtractor': <PDFExtractor />,
      'LikedJobs': <LikedJobs />,
      'cvtosite': <CvtoSite />,
      'Resumesearch':<ResumeSearch/>
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeComponent}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {components[activeComponent] || <DashboardComponent />}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">
      {/* Navbar - Fixed at the top */}
      <motion.nav
        initial={{ y: -NAVBAR_HEIGHT_PX }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 py-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800  "
        style={{ height: `${NAVBAR_HEIGHT_PX}px` }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 h-full">
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-3xl text-zinc-950 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              aria-label="Toggle sidebar"
            >
              <AnimatePresence mode="wait">
                {isSidebarOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    &times;
                  </motion.span>
                ) : (
                  <motion.span
                    key="hamburger"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    &#9776;
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex-grow flex justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hover:from-zinc-600 hover:to-zinc-950 dark:hover:from-zinc-400 dark:hover:to-white transition-all duration-300">
                Hireonova
              </Link>
            </motion.div>
          </div>
          <div className="hidden md:flex lg:flex-grow lg:justify-center">
            <ul className="flex space-x-8">
              {['Home', 'About', 'Contact'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-950 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white text-zinc-950 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="img"
                    aria-label="sun icon"
                    className="text-2xl"
                  >
                    ☀️
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="img"
                    aria-label="moon icon"
                    className="text-2xl"
                  >
                    🌙
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hidden md:block"
            >
              Logout
            </motion.button>
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNavbarMenuOpen(!isNavbarMenuOpen)}
                className="text-3xl text-zinc-950 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                aria-label="Toggle navigation menu"
              >
                &#8942;
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isNavbarMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 mx-4 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <ul className="flex flex-col space-y-3">
                {['Home', 'About', 'Contact'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      onClick={() => setIsNavbarMenuOpen(false)}
                      className="block py-3 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-950 dark:text-white transition-all duration-300 font-medium"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 font-medium shadow-lg"
                  >
                    Logout
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Layout Container */}
      <div className="flex flex-1" style={{ paddingTop: `${NAVBAR_HEIGHT_PX}px` }}>
        {/* Sidebar Overlay for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar - Fixed position */}
        <motion.aside
          initial={{ x: isDesktop ? 0 : -300 }}
          animate={{ x: isDesktop ? 0 : (isSidebarOpen ? 0 : -300) }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`fixed left-0 w-64 z-40 
            bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 
            flex flex-col overflow-hidden`}
          style={{
            top: `${NAVBAR_HEIGHT_PX}px`,
            height: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
          }}
        >
          {/* Sidebar content - scrollable */}
          <div className="overflow-y-auto flex-grow p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold mb-6 text-zinc-950 dark:text-white">
                Hello, <span className="bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">{username}</span>!
              </h2>
            </motion.div>

            <ul className="space-y-2">
              {[
                { key: 'Dashboard', label: 'Dashboard' },
                { key: 'PDFExtractor', label: 'Upload Resume' },
                { key: 'Resumesearch', label: 'Job Fit for you' },
                { key: 'cvtosite', label: 'Portfolio Builder' },
                { key: 'LikedJobs', label: 'LikedJobs' }
              ].map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveComponent(item.key); setIsSidebarOpen(false); }}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeComponent === item.key
                        ? 'text-zinc-950 dark:text-white font-semibold'
                        : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Main Content Area - Adjusts margin based on screen size */}
        <div 
          className="flex-1 bg-white dark:bg-zinc-950 overflow-y-auto transition-all duration-300"
          style={{
            marginLeft: isDesktop ? `${SIDEBAR_WIDTH}px` : '0px',
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`,
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-30"></div>
          <BackgroundGrid>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 relative z-10"
            >
              {renderActiveComponent()}
            </motion.main>
          </BackgroundGrid>
        </div>
      </div>
    </section>
  );
};

export default Home;