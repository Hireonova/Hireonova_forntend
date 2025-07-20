import React, { useEffect, useState } from 'react';
import JobCards from '../components/JobCards';

const API_URL = process.env.REACT_APP_API_URL;
const SECONDARY_API_URL = process.env.REACT_APP_SECONDARY_API_URL;

const LIMIT = 10;

const LikedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const email = localStorage.getItem('email') || 'vermanick75@gmail.com';

  const fetchLikedJobs = async () => {
    try {
      setLoading(true);

      // STEP 1: Get liked job IDs
      let likedIds = [];
      const cached = localStorage.getItem(`liked_job_ids_${email}`);

      if (cached) {
        likedIds = JSON.parse(cached);
      } else {
        const idRes = await fetch(`${API_URL}/api/likedjobsget?email=${email}`);
        const idData = await idRes.json();
        likedIds = idData.liked_job_ids || [];
        localStorage.setItem(`liked_job_ids_${email}`, JSON.stringify(likedIds));
      }

      if (likedIds.length === 0) {
        setJobs([]);
        setTotalJobs(0);
        return;
      }

      // STEP 2: Paginate liked IDs
      const offset = (page - 1) * LIMIT;
      const paginatedIds = likedIds.slice(offset, offset + LIMIT);
      setTotalJobs(likedIds.length);

      const postPayload = {
        ids: paginatedIds,
        page,
        limit: LIMIT,
      };

      const jobRes = await fetch(`${SECONDARY_API_URL}/api/jobsbyids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const jobData = await jobRes.json();
      setJobs(jobData.jobs || []);
    } catch (error) {
      console.error('❌ Error fetching liked jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedJobs();
  }, [page]);

  const handleDislike = async (jobId) => {
    try {
      // 1. Remove job from local state
      setJobs((prev) => prev.filter((job) => job._id !== jobId));

      // 2. Update localStorage liked IDs
      const likedKey = `liked_job_ids_${email}`;
      const currentIds = JSON.parse(localStorage.getItem(likedKey)) || [];
      const updatedIds = currentIds.filter((id) => id !== jobId);
      localStorage.setItem(likedKey, JSON.stringify(updatedIds));
      setTotalJobs(updatedIds.length);

      // 3. Call dislike API to remove from backend
      await fetch(`${API_URL}/api/dislikejob`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, email }),
      });

      // Optional: refresh if page becomes empty
      if ((updatedIds.length % LIMIT === 0) && page > 1 && jobs.length === 1) {
        setPage((prev) => prev - 1);
      }
    } catch (err) {
      console.error('❌ Error disliking job:', err);
    }
  };

  const totalPages = Math.ceil(totalJobs / LIMIT);

  return (
    <div className="min-h-screen text-zinc-900 bg-opacity-70 backdrop-blur-lg">
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold dark:text-white mb-4">Liked Jobs</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading liked jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">You haven't liked any jobs yet.</p>
      ) : (
        <div className="px-4 pb-10">
          <JobCards
            jobs={jobs}
            loading={loading}
            limit={LIMIT}
            onDislike={handleDislike}
          />

          {/* Pagination Controls */}
          <div className="flex dark:text-white justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 dark:text-white bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-medium">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 dark:text-white bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedJobs;
