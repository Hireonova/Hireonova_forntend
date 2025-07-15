'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const ThemeSwitcher = () => (
    <div
      onClick={toggleTheme}
      className={`flex h-6 w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-700 ${
        isDark ? 'justify-end bg-zinc-700' : 'justify-start bg-gray-200'
      }`}
    >
      <motion.div
        className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 10, damping: 24, duration: 1.2 }}
      >
        <span className="text-xs">{isDark ? '🌙' : '🌞'}</span>
      </motion.div>
    </div>
  );

  const navLinks = [
    { name: 'Dashboard', href: '/home' },
    { name: 'Search Jobs', href: '/home#jobs' },
    !isLoggedIn && { name: 'Login', href: '/login' },
  ].filter(Boolean); // Remove falsy items

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-full max-w-[100%] -translate-x-1/2 md:max-w-screen-md">
      <div
        className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 md:px-6 ${
          hasScrolled
            ? 'border border-white/20 bg-white/10 shadow-lg backdrop-blur-lg dark:bg-black/30'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={isDark ? LOGOLIGHT : LOGODARK}
            alt="Hireonova Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-semibold text-black dark:text-white">
            Hireonova
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="transition-transform duration-200 hover:-translate-y-[2px]"
            >
              <Button
                variant="ghost"
                size="default"
                onClick={() => navigate(link.href)}
                className="text-black dark:text-white hover:bg-transparent"
              >
                {link.name}
              </Button>
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-500 hover:bg-transparent hover:-translate-y-[2px] duration-300 hover:text-red-600"
              >
                Logout &nbsp; <IoIosLogOut />

              </Button>
            </li>
          )}
          <li>
            <ThemeSwitcher />
          </li>
        </ul>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            title="Menu"
            className="text-black dark:text-white hover:bg-transparent"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 flex flex-col gap-3 rounded-xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-lg"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-transparent"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(link.href);
                  }}
                >
                  {link.name}
                </Button>
              </li>
            ))}
            {isLoggedIn && (
              <li>
                <Button
                  variant="ghost"
                  className="w-full hover:bg-transparent hover:-translate-y-[2px] duration-300 text-red-400 hover:text-red-600"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                     Logout &nbsp; <IoIosLogOut />

                </Button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
