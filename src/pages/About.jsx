import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BackgroundGrid from "../components/Background";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const About = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const statsData = [
    { number: "100K+", label: "Jobs Scraped", delay: 0 },
    { number: "1M+", label: "Pages Analyzed", delay: 0.1 },
    { number: "50K+", label: "Happy Users", delay: 0.2 },
    { number: "95%", label: "Match Accuracy", delay: 0.3 }
  ];

  const features = [
    {
      title: "AI-Powered Resume Parsing",
      description: "Our advanced AI analyzes your resume to understand your skills, experience, and career aspirations.",
      icon: "🧠"
    },
    {
      title: "Comprehensive Job Discovery", 
      description: "We scan millions of job pages daily to ensure you never miss the perfect opportunity.",
      icon: "🔍"
    },
    {
      title: "Perfect Job Matching",
      description: "Get personalized job recommendations that align with your profile and career goals.",
      icon: "🎯"
    },
    {
      title: "Real-Time Updates",
      description: "Stay ahead with instant notifications for new jobs that match your criteria.",
      icon: "⚡"
    }
  ];

  const FloatingCard = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay,
        duration: 0.8
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { type: "spring", damping: 15, stiffness: 400 }
      }}
      className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
    >
      {children}
    </motion.div>
  );

  return (
    <BackgroundGrid>
        <Navbar/>
        <div className="min-h-screen bg-transparent text-black dark:text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl dark:from-white/5"></div>
        <div className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-tl from-black/3 to-transparent rounded-full blur-3xl dark:from-white/3"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-tr from-black/4 to-transparent rounded-full blur-3xl dark:from-white/4"></div>
      </motion.div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 px-4 text-center max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            style={{ y: textY }}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full mb-6 backdrop-blur-sm">
                YC S24 • AI-Powered Career Matching
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tight"
            >
              <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Our Mission
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-light"
            >
              We've scraped over{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent cursor-pointer"
              >
                100,000 jobs
              </motion.span>{" "}
              from more than{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent cursor-pointer"
              >
                1 million job pages
              </motion.span>{" "}
              across the web.
            </motion.p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 px-4 max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={stat.delay}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <FloatingCard delay={stat.delay}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: stat.delay + 0.5, 
                      type: "spring", 
                      damping: 15,
                      stiffness: 200
                    }}
                    className="text-4xl lg:text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-300"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg lg:text-xl font-medium opacity-80">
                    {stat.label}
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 px-4 max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
            >
              How We{" "}
              <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Innovate
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto font-light leading-relaxed opacity-80"
            >
              Cutting-edge technology meets comprehensive data to deliver unprecedented job matching accuracy.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index * 0.1}
                className="group"
              >
                <FloatingCard delay={index * 0.1}>
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                      {feature.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-lg lg:text-xl opacity-80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Join Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <FloatingCard delay={0}>
            <div className="text-center">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
              >
                Be Part of the{" "}
                <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Revolution
                </span>
              </motion.h2>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", damping: 20 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed"
              >
                Join our mission to bridge the gap between talented individuals and their perfect opportunities.
              </motion.p>
              
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", damping: 20 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              >
                {[
                  { title: "Comprehensive Coverage", desc: "We scan the entire internet" },
                  { title: "AI-Powered Matching", desc: "Advanced algorithms ensure perfect fit" },
                  { title: "Real-Time Updates", desc: "Stay current with latest opportunities" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="text-center p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                    <p className="opacity-70">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FloatingCard>
        </section>
                <Testimonials/>
        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 px-4 text-center max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight"
            >
              Ready to Find Your{" "}
              <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl mb-12 opacity-80 leading-relaxed font-light"
            >
              Join thousands of professionals who have already discovered their perfect career match.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <motion.button
                className="group relative px-12 py-6 text-2xl font-bold rounded-2xl overflow-hidden border-2 border-black dark:border-white hover:border-gray-600 dark:hover:border-gray-400 transition-all duration-500"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-black dark:bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-gray-900 dark:group-hover:text-black transition-colors duration-300 flex items-center space-x-2">
                  <Link to="/app">Find Your Dream Job</Link>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
    <Footer/>
    </BackgroundGrid>
  );
};

export default About;