/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { FaUserCheck, FaSearch, FaRocket, FaGoogle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const codeSnippets = [
  `# Python script for job scraping\nimport requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_job():\n    print(\"Scraping new job...\")\n    print(\"Title: Software Engineer\")\n    print(\"URL: https://example.com/job/123\")\n    print(\"Description: Work with a fast-paced team\")\n    print(\"Apply URL: https://example.com/apply\")\n\nfor i in range(60001, 60006):\n    print(f\"Job no {i} scraped successfully\")`,

  `# Resume parsing in progress...\nAnalyzing resume data...\n2000+ best fit jobs found according to resume!\nMatched on: Python, React, AI, Remote\nTop job: AI Developer at TechNova`,

  `<!-- Optimized AI Portfolio Generation -->\n<html>\n  <head>\n    <title>My AI-Generated Portfolio</title>\n  </head>\n  <body>\n    <h1>Hello, I'm Jane Doe</h1>\n    <p>I specialize in AI, Web Dev, and Automation</p>\n  </body>\n</html>`,
];

const descriptions = [
  "Every Minute we are scrapping 1 Job",
  "Cracking Your Resume to Unlock Dream Jobs!",
  "AI Is Writing the Webpage You Deserve!",
];

const Hero = () => {
  const [codeIndex, setCodeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heading = "Your Dream Job Exists — We’ve Seen the Internet.".split(" ");

  const wordAnimation = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="min-h-screen px-4 py-12 sm:py-16 max-md:mt-14 md:py-20 lg:py-24 font-sans grid place-items-center overflow-x-hidden">
      <div className="bg-white dark:bg-zinc-900/50 ring-1 ring-zinc-100 dark:ring-zinc-800 rounded-3xl shadow-2xl w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center p-6 sm:p-10 md:p-14">
          {/* Left Column */}
          <div className="space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-zinc-900 dark:text-white">
              {heading.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordAnimation}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-2 sm:mr-3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hireonova Scrapes JobBoard, fetches top Opportunities from over{" "}
              <span className="inline-block w-[6rem] text-center font-bold text-zinc-800 dark:text-zinc-200 rounded-md px-1 py-0.5 sm:px-2 sm:py-1 transition-colors duration-500 dark:bg-zinc-800 bg-gray-200">
                <CountUp end={60000} duration={3} separator="," />+
              </span>{" "}
              active job portals, and automates the hiring process with
              intelligence.
            </p>

            <ul className="space-y-3 sm:space-y-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base pt-4">
              <li className="flex items-center gap-2 sm:gap-3">
                <FaUserCheck className="text-green-500 text-base sm:text-lg" />
                Instant Candidate Matching
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <FaSearch className="text-blue-500 text-base sm:text-lg" />
                Smart Resume Search with NLP
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <FaRocket className="text-yellow-500 text-base sm:text-lg" />
                ATS Optimized Job Scraping
              </li>
            </ul>

            {/* Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-3 w-full">
              <a a href="/login" className="pt-3 flex flex-col sm:flex-row gap-3 w-full">
                <button className="bg-zinc-900 dark:bg-white dark:text-black text-white py-3 px-5 text-sm sm:text-base rounded-lg w-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-zinc-800 transition-all duration-300 transform hover:-translate-y-0.5">
                <FaGoogle />
                Sign up with Google
              </button>
              </a>
             <a href="/login" className="pt-3 flex flex-col sm:flex-row gap-3 w-full">
                 <button className="bg-white dark:bg-zinc-800  ring-1 ring-zinc-200 dark:ring-zinc-700 text-black dark:text-white py-3 px-5 text-sm sm:text-base rounded-lg w-full font-semibold flex items-center justify-center gap-2 shadow-md hover:ring-zinc-300 dark:hover:ring-zinc-600 transition-all duration-300 transform hover:-translate-y-0.5">
                Sign up with email <FaArrowRightLong />
              </button>
             </a>
            </div>
          </div>

          {/* Right Column: Code Animation */}
          <div className="rounded-xl overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-xl w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex flex-col bg-[#0D1117]">
            <div className="flex items-center space-x-2 px-4 py-2 sm:py-3 bg-zinc-800 border-b border-zinc-700">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            </div>
            <div className="text-sm sm:text-base text-white font-mono p-4 sm:p-6 whitespace-pre-wrap flex-1 overflow-y-auto">
              <span className="inline-block    bg-zinc-800  text-zinc-100 font-mono text-sm px-3 py-2 rounded-md shadow-inner transition duration-300">
                <Typewriter
                  options={{
                    strings: [descriptions[codeIndex]],
                    autoStart: true,
                    loop: false,
                    delay: 35,
                  }}
                />
              </span>
              <pre className="text-gray-300 leading-relaxed">
                {codeSnippets[codeIndex]}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
