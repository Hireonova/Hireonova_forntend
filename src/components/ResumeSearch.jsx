import React, { useEffect, useState } from 'react';
import FItJobForYou from './FItJobForYou';

const API_URL = process.env.REACT_APP_API_URL;

const ResumeSearch = () => {
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      const email = localStorage.getItem('email');

      // Clear keywords on logout (no email found)
      if (!email) {
        console.warn('Email not found in localStorage');
        setKeywords('');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/resume?email=${email}`);
        const data = await response.json();

        const resumes = data.resumes || [];
        if (resumes.length === 0) {
          console.warn('No resumes found for this user.');
          setKeywords('');
          return;
        }

        const skillsString = resumes[0]?.data?.skills;
        if (!skillsString) {
          console.warn('No skills found in resume.');
          setKeywords('');
          return;
        }

        const keywordsFormatted = skillsString
          .split(',')
          .map(skill => skill.trim())
          .filter(Boolean)
          .slice(0, 10)
          .join(' || ');

        setKeywords(keywordsFormatted);
      } catch (error) {
        console.error('Failed to fetch resume skills:', error);
        setKeywords('');
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="p-4">
      {keywords ? (
        <FItJobForYou>{keywords}</FItJobForYou>
      ) : (
        <p className="text-gray-500">Loading job search from resume skills...</p>
      )}
    </section>
  );
};

export default ResumeSearch;