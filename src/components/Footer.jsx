import React, { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaDiscord,
  FaXTwitter,
} from 'react-icons/fa6';
import { Github, GitFork,   } from 'lucide-react';

 
 
const Footer = () => {
  return (
    // Footer container with responsive padding, border, and dark/light mode styles
    <footer className="w-full bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 p-6 md:p-8 border-t border-gray-200 dark:border-gray-800 font-inter">
      {/* Inner container for content, using flexbox for responsive layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        {/* Section 1: Branding and Slogan */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 lg:w-1/4">
          <h3 className="text-2xl font-bold tracking-tight mb-2">Hireonova</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your AI Recruitment Partner.</p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-4">
            Made with <span className="text-red-500">❤️</span> by <a href='https://github.com/nickhil-verma' className=''><span className="text-blue-400 hover:scale-105">Nickhilverma</span></a>
          </p>
        </div>

        {/* Section 2: Quick Links / Company Navigation */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 lg:w-1/4">
          <h4 className="text-lg font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">Careers</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Social Media and Contribution Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 lg:w-1/4">
          <h4 className="text-lg font-semibold mb-3">Connect & Contribute</h4>
          {/* Social media icons using react-icons/fa6 */}
          <div className="flex gap-4 mb-4">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              <FaDiscord size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              <FaXTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
          {/* GitHub and Contribution links using lucide-react icons */}
          <a href="https://github.com/hireonova/hireonova-frontend" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors mb-2">
            <Github size={16} /> Star on GitHub
          </a>
          <a href="https://github.com/Hireonova/Hireonova_forntend" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
            <GitFork size={16} /> Start Contributing
          </a>
        </div>

      </div>

      {/* Copyright section, full width and centered */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-600 text-center">
        © {new Date().getFullYear()} Hireonova. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
