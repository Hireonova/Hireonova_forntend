import React from "react";
import BackgroundGrid from "../components/Background";
import Navbar from "../components/Navbar";
import BlurText from "../components/BlurText";
import Footer from "../components/Footer";

const About = () => {
    const handleAnimationComplete = () => {
  console.log('');
};
  return (
    <BackgroundGrid>
      <div className="mt-16 text-black dark:text-white   transition-colors duration-300">
        <Navbar />

        {/* Hero Section */}
        <section className="py-16 px-4 text-center max-w-6xl mx-auto">
          <BlurText
            text="Your Dream Job exisit-we have seen the internet!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-extrabold justify-center mb-8"
          />
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-300">
            We've scraped over <strong>100,000 jobs</strong> from more than{" "}
            <strong>1 million job pages</strong> across the web. Our AI-powered
            platform parses your resume and matches you with the perfect
            opportunities.
          </p>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 text-center max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Our Stats</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg font-semibold text-gray-800 dark:text-gray-200">
            <li>100K+ Jobs Scraped</li>
            <li>1M+ Pages Analyzed</li>
            <li>50K+ Happy Users</li>
            <li>95% Match Accuracy</li>
          </ul>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 text-center max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-10">How We Work</h2>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-16">
            Our platform combines cutting-edge technology with comprehensive
            data to deliver the most accurate job matches in the industry.
          </p>
          <ul className="space-y-8 text-left text-gray-800 dark:text-gray-200">
            <li>
              <h4 className="text-2xl font-bold">AI-Powered Resume Parsing</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced AI analyzes your resume to understand your skills,
                experience, and career aspirations.
              </p>
            </li>
            <li>
              <h4 className="text-2xl font-bold">
                Comprehensive Job Discovery
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We scan millions of job pages daily to ensure you never miss the
                perfect opportunity.
              </p>
            </li>
            <li>
              <h4 className="text-2xl font-bold">Perfect Job Matching</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized job recommendations that align with your
                profile and career goals.
              </p>
            </li>
            <li>
              <h4 className="text-2xl font-bold">Real-Time Updates</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Stay ahead with instant notifications for new jobs that match
                your criteria.
              </p>
            </li>
          </ul>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-10">Our Mission</h2>
          <p className="text-2xl text-gray-800 dark:text-gray-300 mb-12">
            We believe that everyone deserves to find work that fulfills them.
            Our mission is to bridge the gap between talented individuals and
            their perfect job opportunities.
          </p>
          <ul className="space-y-6 text-left text-gray-800 dark:text-gray-200">
            <li>
              <h4 className="font-bold text-xl">Comprehensive Coverage</h4>
              <p className="text-gray-600 dark:text-gray-400">
                We scan the entire internet for opportunities
              </p>
            </li>
            <li>
              <h4 className="font-bold text-xl">AI-Powered Matching</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced algorithms ensure perfect fit
              </p>
            </li>
            <li>
              <h4 className="font-bold text-xl">Real-Time Updates</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Stay current with latest opportunities
              </p>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Join thousands of professionals who have already discovered their
            perfect career match.
          </p>
          <p className="text-xl font-bold">Start Your Job Search →</p>
        </section>

        <Footer />
      </div>
    </BackgroundGrid>
  );
};

export default About;
