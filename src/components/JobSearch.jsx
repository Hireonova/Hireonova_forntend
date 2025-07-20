// JobSearch.jsx
import React, { useEffect, useState } from 'react';
import JobCards from './JobCards';
import useDebounce from './hooks/useDebounce'; // Make sure the path is correct

const STORAGE_KEY = 'jobSearchState';
const apiUrl = process.env.REACT_APP_SECONDARY_API_URL;

// Predefined locations
const LOCATIONS = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Gurgaon',
  'Noida',
  'Remote',
  'Other'
];

// Experience levels mapping
const EXPERIENCE_LEVELS = [
  { value: '', label: 'Any Experience', years: '' },
  { value: '0-1', label: 'Fresher (0-1 years)', years: '0-1 years' },
  { value: '1-3', label: 'Junior (1-3 years)', years: '1-3 years' },
  { value: '3-5', label: 'Mid-level (3-5 years)', years: '3-5 years' },
  { value: '5-8', label: 'Senior (5-8 years)', years: '5-8 years' },
  { value: '8-12', label: 'Lead (8-12 years)', years: '8-12 years' },
  { value: '12+', label: 'Expert (12+ years)', years: '12+ years' }
];

const JobSearch = ({ initialKeywords = '', children }) => {
  const extractKeywords = () => children?.toString().trim() || initialKeywords;

  const loadStateFromStorage = () => {
    try {
      const storedState = sessionStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return {
          searchTerm: extractKeywords() || parsedState.searchTerm || '',
          sortOrder: parsedState.sortOrder || 'latest',
          currentPage: parsedState.currentPage || 1,
          limit: parsedState.limit || 9,
          experienceFilter: parsedState.experienceFilter || '',
          locationFilter: parsedState.locationFilter || '',
          roleTypeFilter: parsedState.roleTypeFilter || '',
          jobTypeFilter: parsedState.jobTypeFilter || '',
          skillsFilter: parsedState.skillsFilter || '',
        };
      }
    } catch (error) {
      console.error("Failed to parse state from session storage", error);
    }
    return {
      searchTerm: extractKeywords(),
      sortOrder: 'latest',
      currentPage: 1,
      limit: 9,
      experienceFilter: '',
      locationFilter: '',
      roleTypeFilter: '',
      jobTypeFilter: '',
      skillsFilter: '',
    };
  };

  const initialState = loadStateFromStorage();

  // State Management
  const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
  const [sortOrder, setSortOrder] = useState(initialState.sortOrder);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const [limit, setLimit] = useState(initialState.limit);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [experienceFilter, setExperienceFilter] = useState(initialState.experienceFilter);
  const [locationFilter, setLocationFilter] = useState(initialState.locationFilter);
  const [roleTypeFilter, setRoleTypeFilter] = useState(initialState.roleTypeFilter);
  const [jobTypeFilter, setJobTypeFilter] = useState(initialState.jobTypeFilter);
  const [skillsFilter, setSkillsFilter] = useState(initialState.skillsFilter);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedLocationFilter = useDebounce(locationFilter, 500);
  const debouncedSkillsFilter = useDebounce(skillsFilter, 500);

  // This useEffect now fetches data that is already sorted by the backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        q: debouncedSearchTerm.trim(),
        sort: sortOrder,
        page: currentPage,
        limit: limit,
      });

      // Add filter parameters if they exist
      if (experienceFilter) params.append('experience', experienceFilter);
      if (debouncedLocationFilter) params.append('location', debouncedLocationFilter);
      if (roleTypeFilter) params.append('roleType', roleTypeFilter);
      if (jobTypeFilter) params.append('jobType', jobTypeFilter);
      if (debouncedSkillsFilter) params.append('skills', debouncedSkillsFilter);

      try {
        const res = await fetch(`${apiUrl}/api/jobs?${params.toString()}`);
        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalPages(data.pages || 1);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [
    debouncedSearchTerm,
    sortOrder,
    currentPage,
    limit,
    experienceFilter,
    debouncedLocationFilter,
    roleTypeFilter,
    jobTypeFilter,
    debouncedSkillsFilter
  ]);

  // Save state to session storage
  useEffect(() => {
    const stateToSave = {
      searchTerm,
      sortOrder,
      currentPage,
      limit,
      experienceFilter,
      locationFilter,
      roleTypeFilter,
      jobTypeFilter,
      skillsFilter,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [
    searchTerm,
    sortOrder,
    currentPage,
    limit,
    experienceFilter,
    locationFilter,
    roleTypeFilter,
    jobTypeFilter,
    skillsFilter,
  ]);

  // Handlers
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };
  
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleExperienceChange = (e) => {
    setExperienceFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleRoleTypeChange = (e) => {
    setRoleTypeFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleJobTypeChange = (e) => {
    setJobTypeFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSkillsChange = (e) => {
    setSkillsFilter(e.target.value);
    setCurrentPage(1);
  };

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchTerm('');
    setExperienceFilter('');
    setLocationFilter('');
    setRoleTypeFilter('');
    setJobTypeFilter('');
    setSkillsFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r 
  from-zinc-700 via-gray-500 to-zinc-700 
  dark:from-gray-200 dark:via-zinc-100 dark:to-gray-200 
  bg-clip-text text-transparent mb-4">
  Find Your Dream Job
</h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-300 font-medium">
            Discover opportunities that match your ambitions
          </p>
        </div>

        {/* Search & Filters Section */}
        <div className="backdrop-blur-sm bg-white/10 dark:bg-zinc-900/50 rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
          {/* Main Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for your next opportunity..."
              className="w-full pl-16 pr-6 py-6 text-lg bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-600 transition-all duration-300 outline-none text-zinc-900 dark:text-white placeholder-zinc-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Advanced Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Experience Level */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Experience Level
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-xl focus:border-indigo-500 transition-all duration-300 outline-none appearance-none text-zinc-900 dark:text-white"
                  value={experienceFilter}
                  onChange={handleExperienceChange}
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Location
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-xl focus:border-indigo-500 transition-all duration-300 outline-none appearance-none text-zinc-900 dark:text-white"
                  value={locationFilter}
                  onChange={handleLocationChange}
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Role Type */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Role Type
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-xl focus:border-indigo-500 transition-all duration-300 outline-none appearance-none text-zinc-900 dark:text-white"
                  value={roleTypeFilter}
                  onChange={handleRoleTypeChange}
                >
                  <option value="">All Role Types</option>
                  <option value="engineering">Engineering</option>
                  <option value="management">Management</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="product">Product</option>
                  <option value="operations">Operations</option>
                  <option value="finance">Finance</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Work Type
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-xl focus:border-indigo-500 transition-all duration-300 outline-none appearance-none text-zinc-900 dark:text-white"
                  value={jobTypeFilter}
                  onChange={handleJobTypeChange}
                >
                  <option value="">All Work Types</option>
                  <option value="remote">🏠 Remote</option>
                  <option value="hybrid">🔄 Hybrid</option>
                  <option value="on-site">🏢 On-site</option>
                  <option value="full-time">💼 Full-time</option>
                  <option value="part-time">⏰ Part-time</option>
                  <option value="contract">📋 Contract</option>
                  <option value="internship">🎓 Internship</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
              Skills & Technologies
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="e.g., React, Node.js, Python, TypeScript..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-xl focus:border-indigo-500 transition-all duration-300 outline-none text-zinc-900 dark:text-white placeholder-zinc-500"
                value={skillsFilter}
                onChange={handleSkillsChange}
              />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-600">
            {/* Clear Filters Button */}
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sort by:</span>
              <select
                className="px-4 py-2 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-lg focus:border-indigo-500 transition-all duration-300 outline-none text-sm text-zinc-900 dark:text-white"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="latest">⏰ Latest</option>
                <option value="oldest">📅 Oldest</option>
              </select>
            </div>

            {/* Results per page */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Show:</span>
              <select
                value={limit}
                onChange={handleLimitChange}
                className="px-4 py-2 bg-zinc-50 dark:bg-zinc-700 border-2 border-transparent rounded-lg focus:border-indigo-500 transition-all duration-300 outline-none text-sm text-zinc-900 dark:text-white"
              >
                {[9, 12, 15, 18, 21, 24].map((num) => (
                  <option key={num} value={num}>{num} jobs</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div id='jobs' className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20  rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            </div>
            <p className="mt-6 text-xl font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">
              🔍 Finding the best jobs for you...
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Searching through thousands of opportunities
            </p>
          </div>
        )}

        {/* Job Results */}
        {!loading && (
          <>
            <JobCards
              jobs={jobs}
              loading={loading}
              limit={limit}
              highlight={searchTerm}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center mt-12 space-y-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || loading}
                    className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === 1 || loading
                        ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
                        : 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-lg hover:shadow-xl hover:-tranzinc-y-1 border border-indigo-200 dark:border-zinc-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-2">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNum = currentPage <= 3 ? index + 1 : 
                                    currentPage >= totalPages - 2 ? totalPages - 4 + index : 
                                    currentPage - 2 + index;
                      
                      if (pageNum < 1 || pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                            currentPage === pageNum
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-zinc-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || loading}
                    className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === totalPages || loading
                        ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
                        : 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-lg hover:shadow-xl hover:-tranzinc-y-1 border border-indigo-200 dark:border-zinc-600'
                    }`}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobSearch;