import React, { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'jobSearchState';

const FItJobForYou = ({ initialKeywords = '', children }) => {
  const extractKeywords = () =>
    children?.toString().trim() || initialKeywords;

  const loadStateFromStorage = () => {
    try {
      const storedState = sessionStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return {
          searchTerm: extractKeywords() || parsedState.searchTerm || '',
          sortOrder: parsedState.sortOrder || 'latest',
          currentPage: parsedState.currentPage || 1,
        };
      }
    } catch (error) {
      console.error("Failed to parse state from session storage", error);
    }
    return {
      searchTerm: extractKeywords(),
      sortOrder: 'latest',
      currentPage: 1,
    };
  };

  const initialState = loadStateFromStorage();

  const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
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
      const res = await fetch(`http://localhost:8080/jobs?limit=5000`);
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
    let filteredAndSorted = [...allJobs];

    const orKeywords = searchTerm.split('||').map(k => k.trim().toLowerCase()).filter(Boolean);

    if (orKeywords.length > 0) {
      filteredAndSorted = filteredAndSorted.filter(job => {
        const title = (job.job_title || '').toLowerCase();
        const description = (job.job_description || '').toLowerCase();
        return orKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
      });
    }

    filteredAndSorted.sort((a, b) => {
      const dateA = new Date(a.date_posted || '2000-01-01');
      const dateB = new Date(b.date_posted || '2000-01-01');
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

    const newTotalPages = Math.ceil(filteredAndSorted.length / limit);
    setDisplayedJobs(filteredAndSorted);
    setTotalPages(newTotalPages);

    if (extractKeywords() !== searchTerm) {
      setCurrentPage(1);
    } else if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
  }, [allJobs, searchTerm, sortOrder, limit, currentPage, initialKeywords, children]);

  useEffect(() => {
    const stateToSave = { searchTerm, sortOrder, currentPage };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [searchTerm, sortOrder, currentPage]);

  const paginatedJobs = displayedJobs.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const truncateDescription = (description, wordLimit) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length <= wordLimit ? description : words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen min-w-full text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-zinc-600 dark:text-zinc-400">
          Discover Your Next Opportunity
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-6 rounded-xl shadow-lg ring-1 ring-zinc-100 dark:ring-zinc-800">
          <input
            type="text"
            placeholder="Search by job title or description..."
            className="w-full sm:w-2/3 px-5 py-3 border  border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
            value="Jobs Fit for you"
            
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && allJobs.length === 0 ? (
            Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl shadow-lg animate-pulse ring-1 ring-zinc-100 dark:ring-zinc-800">
                <div className="h-16 w-16 bg-gray-300 dark:bg-zinc-700 rounded-full mb-4 mx-auto"></div>
                <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-3/4 mb-3 mx-auto"></div>
                <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-5/6 mb-4"></div>
                <div className="h-10 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <div
                key={job._id}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ring-1 ring-zinc-100 dark:ring-zinc-800 bg-white dark:bg-zinc-950"
              >
                <div className="flex flex-col items-center gap-4 mb-4">
                  <img
                    src={job.company_image || ''}
                    alt={job.company || 'Company Logo'}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg';
                    }}
                    className="w-16 h-16 object-contain rounded-full border border-gray-200 dark:border-zinc-700 p-1 bg-white dark:bg-zinc-700"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {job.job_title || 'Untitled Job'}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 flex-grow text-center">
                  {truncateDescription(job.job_description, 25)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
                  Posted on:{' '}
                  {job.date_posted
                    ? new Date(job.date_posted).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
                <a
                  href={job.apply_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block w-full text-center bg-zinc-900 hover:bg-zinc-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
                >
                  Apply Now
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full py-10">
              No jobs found matching your criteria.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={handlePrevPage}
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
              onClick={handleNextPage}
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