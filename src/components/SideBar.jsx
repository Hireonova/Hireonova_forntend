import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Settings,
  BarChart2,
  Layers,
  Shield,
  Sun,
  Moon,
  LogOut,
  ChevronFirst,
  ChevronLast,
  Upload,
  Heart,
  Briefcase,
  Crown,
  Coffee,
  Star,
  GitBranch,
  X,
} from "lucide-react";

const SidebarContext = createContext();

export const SideBar = () => {
    const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved || "light";
    }
    return "light";
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const profileRef = useRef(null);

  // Check screen size and auto-collapse on mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      const isMd = window.innerWidth < 768; // md breakpoint is 768px
      setIsMobile(isMd);
      if (isMd && expanded) {
        setExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [expanded]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

    const handleLogout = () => {
  // Clear all user-related localStorage keys
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('isAuthenticated');

  // Optionally, clear entire localStorage if you want
  // localStorage.clear();

  // Redirect to login page
  navigate('/login');
};


  const [username, setUsername] = useState(() => {
    const stored = localStorage.getItem("username");
    return stored || "Guest";
  });

  const userInitial = username.charAt(0).toUpperCase();

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
  };

  return (
    <>
      <motion.aside
        variants={sidebarVariants}
        animate={expanded ? "expanded" : "collapsed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-screen relative"
      >
        <nav className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
          {/* Logo and Toggle */}
          <motion.div
            className="p-4 pb-2 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Tooltip text="Hireonova" show={!expanded}>
              <motion.div
                className="flex items-center cursor-pointer"
                onClick={() => !expanded && setExpanded(true)} // Expand on logo click when collapsed
              >
                <motion.img
                  src="https://i.ibb.co/HDTxKLmC/hriefromcvlogodark-removebg-preview.png"
                  alt="logo"
                  className="w-10 h-10"
                  animate={{ scale: expanded ? 1 : 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 text-lg font-bold text-gray-900 dark:text-white"
                    >
                      Hireonova
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Tooltip>

            {expanded && ( // Only show the toggle button when expanded
              <motion.button
                onClick={() => {
                  // Prevent expanding on mobile devices
                  if (isMobile && !expanded) return;
                  setExpanded((curr) => !curr);
                }}
                className={`p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors ${
                  isMobile && !expanded ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: isMobile && !expanded ? 1 : 1.05 }}
                whileTap={{ scale: isMobile && !expanded ? 1 : 0.95 }}
              >
                <motion.div
                  animate={{ rotate: expanded ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronFirst size={18} />
                </motion.div>
              </motion.button>
            )}
          </motion.div>

          {/* Items */}
          <SidebarContext.Provider value={{ expanded }}>
            <motion.ul
              className="flex-1 px-3 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SidebarItem
                icon={<BarChart2 size={20} />}
                text="Dashboard"
                to="/app/dashboard"
              />
              

              <SidebarItem
                icon={<Upload size={20} />}
                text="Upload Resume"
                to="/app/upload-resume"
              />
              <SidebarItem
                icon={<Briefcase size={20} />}
                text="Job Fit for You"
                to="/app/job-fit"
              />
              <SidebarItem
                icon={<Heart size={20} />}
                text="Liked Jobs"
                to="/app/liked-jobs"
                alert
              />
              <SidebarItem
                icon={<Layers size={20} />}
                text="Portfolio Builder"
                to="/app/site-builder"
                alert
              />
              <SidebarItem
                icon={<Home size={20} />}
                text="Back Home"
                to="/"
              />
            </motion.ul>
          </SidebarContext.Provider>

          {/* Footer */}
          <motion.div
            className="border-t border-gray-200 dark:border-gray-800 flex flex-col p-3 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Theme Switch */}
            <Tooltip
              text={theme === "light" ? "Dark Mode" : "Light Mode"}
              show={!expanded}
            >
              <motion.button
                className="flex items-center justify-center p-3 rounded-xl cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                onClick={toggleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: theme === "light" ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3"
                    >
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Tooltip>

            {/* User Profile */}
            <Tooltip text="Profile Menu" show={!expanded}>
              <motion.button
                ref={profileRef}
                className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
                onClick={() => setShowProfileModal(!showProfileModal)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center font-bold text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {userInitial}
                </motion.div>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 flex-1 text-left"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {username}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Free Plan
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Tooltip>

            {/* Logout */}
            <Tooltip text="Logout" show={!expanded}>
              <motion.button
                className="flex items-center justify-center p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={20} />
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Tooltip>
          </motion.div>
        </nav>
      </motion.aside>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        username={username}
        userInitial={userInitial}
        profileRef={profileRef}
        expanded={expanded}
      />
    </>
  );
};

const SidebarItem = ({ icon, text, to, alert }) => {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Tooltip text={text} show={!expanded}>
      <Link to={to}>
        <motion.li
          className={`relative flex items-center py-3 px-3 font-medium rounded-xl cursor-pointer transition-all group ${
            active
              ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
              : "hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400"
          }`}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: active ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
          {alert && (
            <motion.div
              className={`absolute w-2 h-2 rounded-full bg-red-500 ${
                expanded ? "right-3" : "top-2 right-2"
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.li>
      </Link>
    </Tooltip>
  );
};

const Tooltip = ({ children, text, show }) => {
  if (!show) return children;

  return (
    <div className="relative group">
      {children}
      <motion.div
        className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap invisible group-hover:visible"
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        {text}
        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
      </motion.div>
    </div>
  );
};

const ProfileModal = ({
  isOpen,
  onClose,
  username,
  userInitial,
  profileRef,
  expanded,
}) => {
  const menuItems = [
    {
      icon: <Crown size={18} />,
      text: "Upgrade to Pro",
      color: "text-yellow-600",
    },
    {
      icon: <GitBranch size={18} />,
      text: "Contribute",
      color: "text-green-600",
    },
    { icon: <Coffee size={18} />, text: "Donate", color: "text-red-600" },
    {
      icon: <Star size={18} />,
      text: "Write a Review",
      color: "text-blue-600",
    },
  ];

  const handleItemClick = (itemText) => {
    console.log(`Clicked: ${itemText}`);
    // Add your logic for each menu item here
    onClose();
  };

  // Calculate modal position
  const getModalPosition = () => {
    if (!profileRef.current) return {};

    const rect = profileRef.current.getBoundingClientRect();
    const modalWidth = expanded ? 280 : 200;

    return {
      position: "fixed",
      bottom: window.innerHeight - rect.top + 10,
      left: expanded ? rect.left : rect.right + 10,
      width: modalWidth,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-50"
            style={getModalPosition()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  {userInitial}
                </motion.div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    {username}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Free Plan
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} className="text-gray-500" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item.text)}
                >
                  <span
                    className={`${item.color} group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {item.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
