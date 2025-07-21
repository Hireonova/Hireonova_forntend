import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MapPin,
  Briefcase,
  Clock,
  Code,
  Calendar,
  ExternalLink,
  Zap,
  Heart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const truncateDescription = (description, wordLimit) => {
  if (!description) return '';
  const words = description.split(' ');
  return words.length <= wordLimit
    ? description
    : words.slice(0, wordLimit).join(' ') + '...';
};

const highlightMatch = (text, keyword) => {
  if (!keyword || !text) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = String(text).split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-300 text-black px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const JobCards = ({ jobs = [], loading = false, limit = 6, highlight = '' }) => {
  const navigate = useNavigate();
  const [likedJobs, setLikedJobs] = useState(new Set());
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) return;

    axios
      .get(`${API_URL}/api/likedjobsget`, { params: { email } })
      .then((res) => {
        const ids = res.data.liked_job_ids || [];
        setLikedJobs(new Set(ids));
        localStorage.setItem(`liked_job_ids_${email}`, JSON.stringify(ids));
      })
      .catch(() => {});
  }, [email]);

  const handleLikeToggle = async (jobId) => {
    if (!email) {
       toast.warn("Login required", { position: "top-right" });
      return;
    }

    const isLiked = likedJobs.has(jobId);
    const updated = new Set(likedJobs);
    isLiked ? updated.delete(jobId) : updated.add(jobId);
    setLikedJobs(updated);
    localStorage.setItem(`liked_job_ids_${email}`, JSON.stringify([...updated]));

    try {
      if (isLiked) {
        await axios.post(`${API_URL}/api/dislikejob`, {
          email,
          job_id: jobId,
        });
      } else {
        await axios.post(`${API_URL}/api/likedjob`, {
          email,
          job_id: jobId,
        });
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
      // Roll back on failure
      const rollback = new Set(likedJobs);
      isLiked ? rollback.add(jobId) : rollback.delete(jobId);
      setLikedJobs(rollback);
      localStorage.setItem(`liked_job_ids_${email}`, JSON.stringify([...rollback]));
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-black/5 dark:bg-white/10 h-40 rounded-xl border border-black/10 dark:border-white/20"
          ></div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <Briefcase className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          No jobs found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job) => {
        const isLiked = likedJobs.has(job._id);
        return (
          <div
            key={job._id}
            className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
          >
            <div className="flex-shrink-0">
              <img
                src={job.company_image || ''}
                alt={job.company || 'Company Logo'}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg';
                }}
                className="w-20 h-20 object-contain rounded-lg border border-black/10 dark:border-white/20 p-2 bg-black/5 dark:bg-white/10"
              />
            </div>

            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {highlightMatch(job.job_title || 'Job Title', highlight)}
                </h3>
                <button
                  onClick={() => handleLikeToggle(job._id)}
                  className="ml-4"
                  title={isLiked ? 'Dislike' : 'Like'}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked
                        ? 'text-red-500 fill-red-500'
                        : 'text-zinc-400 hover:text-red-500'
                    }`}
                    fill={isLiked ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 w-fit">
                {highlightMatch(job.job_type || 'Full-time', highlight)}
              </span>

              <p className="text-zinc-700 dark:text-zinc-300 mt-2">
                {highlightMatch(
                  truncateDescription(job.job_description, 60),
                  highlight
                )}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {highlightMatch(job.location || 'Remote', highlight)}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {highlightMatch(job.work_mode || 'Full-time', highlight)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {highlightMatch(job.experience || 'Any level', highlight)} experience
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={16} />
                  {highlightMatch(job.job_type || 'Full time', highlight)}
                </div>
                <div className="flex items-center gap-1">
                  <Code size={16} />
                  {highlightMatch(
                    Array.isArray(job.skills)
                      ? job.skills.slice(0, 3).join(', ')
                      : String(job.skills),
                    highlight
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {job.date_posted
                    ? new Date(job.date_posted).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Recently posted'}
                </div>
              </div>
<ToastContainer />
              <div className="mt-4 flex justify-end">
                <a
                  href={job.apply_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
          
        );
      })}
    </div>
  );
};

export default JobCards;
