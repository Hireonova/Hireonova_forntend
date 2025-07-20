import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import BackgroundGrid from "./Background";

const API_URL = process.env.REACT_APP_API_URL;

const getColor = (score) => {
  if (score >= 80) return "text-green-600 border-green-500";
  if (score >= 50) return "text-yellow-600 border-yellow-500";
  return "text-red-600 border-red-500";
};

const ProgressBar = ({ count }) => {
  const percentage = (count / 3) * 100;
  return (
    <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all duration-500 ease-in-out ${percentage === 100 ? "bg-green-500" : "bg-blue-500"}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const DashboardComponent = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [dashboard, setDashboard] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const dashRes = await fetch(`${API_URL}/api/dashboard?email=${email}`);
        const dashData = await dashRes.json();
        setDashboard(dashData);

        const resumeRes = await fetch(`${API_URL}/api/resume?email=${email}`);
        const resumeData = await resumeRes.json();
        setResume(resumeData);
      } catch (err) {
        console.error("Error fetching dashboard or resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (loading)
    return <p className="text-center mt-10 text-zinc-600 dark:text-zinc-400 animate-pulse">Loading Dashboard...</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      

      {/* Content Area */}
      <div className="flex-1   p-10 relative z-10">
       
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8">📊 Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* ATS Score */}
            <div className="flex items-center space-x-6 p-6 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl shadow-md">
              <div
                className={`w-28 h-28 rounded-full border-8 flex items-center justify-center text-xl font-bold transition-all duration-300 ease-in-out ${getColor(
                  dashboard?.ats_score
                )}`}
              >
                {dashboard?.ats_score || 0}%
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">ATS Score</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {dashboard?.ats_score >= 80 ? "✅ Highly optimized resume!" : "⚠️ Could use improvement."}
                </p>
              </div>
            </div>

            {/* Resume Count */}
            <div className="p-6 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl shadow-md">
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Resume Usage</p>
              <ProgressBar count={dashboard?.resume_count || 0} />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {dashboard?.resume_count || 0} / 3 resumes parsed
              </p>
            </div>

            {/* Webpage Count */}
            <div className="p-6 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl shadow-md">
              <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Portfolio Builder Usage</p>
              <ProgressBar count={dashboard?.total_webpages_created || 0} />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {dashboard?.total_webpages_created || 0} / 3 pages built
              </p>
            </div>
          </div>

          {/* Resume Card */}
          {resume?.resumes?.[0] && (
            <div className="p-6 bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-md rounded-2xl">
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">📄 Resume Snapshot</h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                <strong>Skills:</strong> {resume.resumes[0].data.skills}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Education</h3>
                  {Object.values(resume.resumes[0].data.education || {}).map((edu, idx) => (
                    <div key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                      🎓 {edu.title} ({edu.duration})
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Experience</h3>
                  {Object.values(resume.resumes[0].data.experience || {}).map((exp, idx) => (
                    <div key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      🏢 {exp.title} ({exp.duration})
                      <br />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{exp.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!resume?.resumes?.length && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-xl text-yellow-800 dark:text-yellow-100">
              ⚠️ No resumes uploaded yet. Start by uploading to unlock insights!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
