import React, { useEffect, useState, useCallback, useMemo } from 'react';
import JobCards from './JobCards';

const STORAGE_KEY = 'jobSearchState';
const apiUrl = process.env.REACT_APP_SECONDARY_API_URL;

const FItJobForYou = ({ initialKeywords = '', children }) => {
  const extractKeywords = useCallback(() => {
    return children?.toString().trim() || initialKeywords;
  }, [children, initialKeywords]);

  const initialState = useMemo(() => {
    try {
      const storedState = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      return {
        searchTerm: extractKeywords() || storedState?.searchTerm || '',
        sortOrder: storedState?.sortOrder || 'latest',
        currentPage: storedState?.currentPage || 1,
      };
    } catch {
      return {
        searchTerm: extractKeywords(),
        sortOrder: 'latest',
        currentPage: 1,
      };
    }
  }, [extractKeywords]);

  const [searchTerm] = useState(initialState.searchTerm);
  const [sortOrder, setSortOrder] = useState(initialState.sortOrder);
  const [allJobs, setAllJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/jobs?limit=5000`);
      const data = await res.json();
      setAllJobs(data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
      setAllJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  useEffect(() => {
    const orKeywords = searchTerm.split('||').map(k => k.trim().toLowerCase()).filter(Boolean);

    let filtered = allJobs.filter(job => {
      if (orKeywords.length === 0) return true;
      const title = (job.job_title || '').toLowerCase();
      const desc = (job.job_description || '').toLowerCase();
      return orKeywords.some(k => title.includes(k) || desc.includes(k));
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.date_posted || '2000-01-01');
      const dateB = new Date(b.date_posted || '2000-01-01');
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

    const pages = Math.max(1, Math.ceil(filtered.length / limit));
    const page = Math.min(currentPage, pages);

    setDisplayedJobs(filtered);
    setTotalPages(pages);
    setCurrentPage(page);

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      searchTerm,
      sortOrder,
      currentPage: page
    }));
  }, [allJobs, sortOrder, searchTerm, limit, currentPage]);

  const paginatedJobs = displayedJobs.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="min-h-screen min-w-full text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-zinc-600 dark:text-zinc-400">
          Discover Your Next Opportunity
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-6 rounded-xl shadow-lg ring-1 ring-zinc-100 dark:ring-zinc-800">
          <input
            type="text"
            className="w-full sm:w-2/3 px-5 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
            value="Perfect Job found for you on internet"
            readOnly
          />
          <select
            className="w-full sm:w-1/3 px-5 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-900 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Sort: Latest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
        </div>

        <JobCards jobs={paginatedJobs} loading={loading} limit={limit} />

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentPage === 1 || loading
                  ? 'bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-zinc-500 hover:bg-zinc-600 text-white'
              }`}
            >
              Previous
            </button>

            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentPage === totalPages || loading
                  ? 'bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-zinc-500 hover:bg-zinc-600 text-white'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FItJobForYou;
