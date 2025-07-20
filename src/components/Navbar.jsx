'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Briefcase, Target, FileText, Code, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { IoIosLogOut } from "react-icons/io";

import LOGOLIGHT from '../assets/hirefromcvlogolight.png';
import LOGODARK from '../assets/hriefromcvlogodark-removebg-preview.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }

    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleDropdownEnter = (dropdownName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const ThemeSwitcher = () => (
    <motion.div
      onClick={toggleTheme}
      className={`relative flex h-7 w-14 cursor-pointer items-center rounded-full p-1 transition-all duration-500 ${
        isDark 
          ? 'justify-end bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/25' 
          : 'justify-start bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-orange-500/25'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xl"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.span 
          className="text-xs"
          animate={{ rotate: isDark ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
        isDark ? 'from-purple-400/20 to-indigo-400/20' : 'from-yellow-400/20 to-orange-400/20'
      } blur-xl`} />
    </motion.div>
  );

  const jobsDropdownItems = [
    { name: 'Job Fit For You', href: '/home#job-fit', icon: Target, description: 'AI-matched opportunities' },
    { name: 'Search Jobs', href: '#jobs', icon: Briefcase, description: 'Browse all positions' },
  ];

  const resourcesDropdownItems = [
    { name: 'About', href: '/aboutus', icon: FileText, description: 'Learn about our mission' },
    { name: 'Documentation', href: '/docs', icon: Code, description: 'Developer resources' },
    { name: 'Contribute', href: '/contribute', icon: Heart, description: 'Join our community' },
  ];

  const navLinks = [
    { name: 'Dashboard', href: '/home' },
    { 
      name: 'Jobs', 
      isDropdown: true, 
      dropdownItems: jobsDropdownItems,
      dropdownKey: 'jobs'
    },
    { 
      name: 'Resources', 
      isDropdown: true, 
      dropdownItems: resourcesDropdownItems,
      dropdownKey: 'resources'
    },
    !isLoggedIn && { name: 'Login', href: '/login' },
  ].filter(Boolean);

  const DropdownMenu = ({ items, isOpen, dropdownKey }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-2xl dark:bg-black/20"
          onMouseEnter={() => handleDropdownEnter(dropdownKey)}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="absolute inset-0 rounded-2xl bg-white" />
          {items.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                navigate(item.href);
                setActiveDropdown(null);
              }}
              className="group relative flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                <item.icon size={16} />
              </div>
              <div>
                <div className="font-medium text-gray-900   group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-full max-w-[95%] -translate-x-1/2 md:max-w-5xl">
      <motion.div
        className={`relative flex items-center justify-between rounded-3xl px-6 py-4 transition-all duration-500 ${
          hasScrolled
            ? 'border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl dark:bg-black/20 dark:border-white/10'
            : 'border border-transparent bg-white/5 backdrop-blur-sm dark:bg-black/5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-white/2 dark:to-white/2" />
        
        {/* Logo */}
        <motion.a 
          href="/" 
          className="relative flex items-center gap-3 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <img
              src={isDark ? LOGOLIGHT : LOGODARK}
              alt="Hireonova Logo"
              className="h-9 w-9 object-contain"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-lg" />
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-300">
            Hireonova
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:flex" ref={dropdownRef}>
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.isDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(link.dropdownKey)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <motion.button
                    className="flex items-center gap-1 rounded-xl px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-white/10 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                    <motion.div
                      animate={{ rotate: activeDropdown === link.dropdownKey ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                  <DropdownMenu 
                    items={link.dropdownItems} 
                    isOpen={activeDropdown === link.dropdownKey}
                    dropdownKey={link.dropdownKey}
                  />
                </div>
              ) : (
                <motion.button
                  onClick={() => navigate(link.href)}
                  className="rounded-xl px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-white/10 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.button>
              )}
            </div>
          ))}
          
          {isLoggedIn && (
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-600"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout <IoIosLogOut />
            </motion.button>
          )}
          
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="relative flex items-center gap-3 md:hidden z-10">
          <ThemeSwitcher />
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gray-700 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 dark:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-3 overflow-hidden rounded-2xl border border-white/90 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl dark:bg-black/20 md:hidden"
          >
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.isDropdown ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700 dark:text-gray-300 px-3 py-2">
                        {link.name}
                      </div>
                      {link.dropdownItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            navigate(item.href);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-white/10"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400">
                            <item.icon size={14} />
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        navigate(link.href);
                        setIsOpen(false);
                      }}
                      className="w-full rounded-xl p-3 text-left font-medium text-gray-700 transition-all duration-200 hover:bg-white/10 dark:text-gray-300"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))}
              
              {isLoggedIn && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl p-3 text-left font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10"
                >
                  Logout <IoIosLogOut />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}