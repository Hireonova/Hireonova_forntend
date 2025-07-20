import React, { useEffect, useState } from 'react';
import JobCards from './JobCards';

const API_URL = process.env.REACT_APP_API_URL;
const SECONDARY_API_URL = process.env.REACT_APP_SECONDARY_API_URL;

const ResumeSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch resume
        const resumeRes = await fetch(`${API_URL}/api/resume?email=${email}`);
        const resumeData = await resumeRes.json();
        const resumes = resumeData.resumes || [];

        if (!resumes.length) return;

        // Step 2: Extract skills
        const skillsRaw = resumes[0]?.data?.skills || '';
        console.log('🧠 Skills fetched from API:', skillsRaw);

        const skillList = skillsRaw
          .split(',')
          .map(skill => skill.trim().toLowerCase())
          .filter(Boolean)
          .slice(0, 100); // Limit to 10 skills

        const skillParam = skillList.join(',');
        console.log('📦 Skills sent to API:', skillParam);

        // Step 3: Escape for safe RegExp in JobCards.jsx
        const escapedSearchTerm = skillList
          .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join(',');
        setSearchTerm(escapedSearchTerm);

        // Step 4: Fetch jobs
        const response = await fetch(
          `${SECONDARY_API_URL}/api/jobs?page=${page}&limit=${limit}&skills=${encodeURIComponent(skillParam)}`
        );
        const data = await response.json();

        setJobs(data.jobs || []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setTotalPages(data.pages || 1);

        console.log('📄 Total Jobs:', data.total);
        console.log('📍 Current Page:', data.page);
      } catch (err) {
        console.error('❌ Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [email, limit, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section className="px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-semibold dark:text-white">Best Jobs For You</h2>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Reset page to 1 when limit changes
            }}
            className="border rounded px-3 py-1 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value={10}>10 Jobs</option>
            <option value={20}>20 Jobs</option>
            <option value={50}>50 Jobs</option>
            <option value={100}>100 Jobs</option>
          </select>
        </div>
      </div>

      <JobCards
        jobs={jobs}
        loading={loading}
        limit={limit}
        highlight={searchTerm}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 text-sm rounded-md border dark:border-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm dark:text-white">
          Page <span className="font-semibold">{page}</span> of{' '}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm rounded-md border dark:border-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ResumeSearch;
