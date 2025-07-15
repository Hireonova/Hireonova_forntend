import React, { useState, useCallback, useEffect } from "react";
import { Upload, CheckCircle } from "lucide-react";

const API_URL = "https://hireonova-backend.vercel.app";
const GEMINI_KEY = "AIzaSyBn0HWq8y9QDY_GXC_Gqev7Kk3Quo9s8KU";

const extractWithGemini = async (text) => {
  const prompt = `
You are an expert Resume Parser. Given this resume text, extract, also:
- first_name
- last_name
- linkedin_url
- github_url
- skills (comma separated string)
- ats_score (0–100)
- education as object like:
  {
    "1": { "title": "College A", "duration": "2018-2022" }
  }
- experience as object like:
  {
    "1": { "title": "X Corp", "duration": "2021-2022", "description": "Worked on XYZ" }
  }
- HTML content like: "<html><body>...</body></html>"

Return only clean JSON, no Markdown, no explanation.

Resume Text:
${text}`.trim();

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  let raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  raw = raw.replace(/```json|```/g, "").trim();

  return JSON.parse(raw);
};

const PDFExtractor = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch(`${API_URL}/api/resume?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.resumes?.length > 0) {
          const resume = data.resumes[0];
          setResult({
            filename: `${resume.slot}.pdf`,
            ...resume.data,
            html_content: resume.html || "",
            subscription_tier: data.subscription_tier,
            max_resumes_allowed: data.max_resumes_allowed,
            current_resume_count: data.current_resume_count,
          });
        }
      })
      .catch((err) => console.error("❌ Resume fetch error:", err));
  }, []);

  const loadPDFJS = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const extractPDFContent = async (file) => {
    try {
      setIsProcessing(true);
      setError("");
      setResult(null);

      const pdfjsLib = await loadPDFJS();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map((item) => item.str).join(" ") + "\n";
      }

      const parsed = await extractWithGemini(fullText);
      console.log("🧠 Gemini Parsed Output:", parsed);

      const email = localStorage.getItem("email");

      const payload = {
        email: email || "",
        resume: {
          skills: parsed.skills || "",
          education: parsed.education || {},
          experience: parsed.experience || {},
          ats_score: parsed.ats_score || 0,
          linkedin_url: parsed.linkedin_url || "",
          github_url: parsed.github_url || "",
          first_name: parsed.first_name || "",
          last_name: parsed.last_name || "",
        },
        html_content: parsed.HTML || "",
      };

      console.log("📦 Final Payload to Backend:", payload);

      const res = await fetch(`${API_URL}/api/resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult({ ...payload.resume, ...data, filename: file.name });
    } catch (err) {
      console.error("❌ Extraction or upload error:", err);
      setError("Failed to extract or upload resume.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      extractPDFContent(file);
    } else {
      setError("Please select a valid PDF.");
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = Array.from(e.dataTransfer.files)[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      extractPDFContent(file);
    } else {
      setError("Please drop a valid PDF.");
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-6">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-extrabold text-center mb-8 text-zinc-800 dark:text-white">
      📤 Resume Uploader
    </h1>

    {!result && (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed p-10 rounded-2xl text-center transition-all duration-300 shadow-md ${
          isDragOver ? "border-blue-400 bg-blue-100 dark:bg-blue-900/30" : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
        }`}
      >
        <Upload className="mx-auto w-10 h-10 text-zinc-400 dark:text-zinc-500" />
        <p className="text-zinc-700 dark:text-zinc-300 mt-4 text-lg font-medium">
          Drag & drop your resume PDF here
        </p>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">or</p>
        <label className="cursor-pointer inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all font-semibold">
          <Upload className="w-4 h-4 mr-2" />
          Choose PDF
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    )}

    {isProcessing && (
      <div className="text-center mt-6 text-blue-600 dark:text-blue-400 font-medium animate-pulse">
        Processing resume with AI...
      </div>
    )}

    {error && (
      <div className="text-center mt-6 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </div>
    )}

    {result && result.skills && (
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-md p-6 rounded-2xl mt-10">
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
            ✅ Existing Resume Found
          </h2>
        </div>

        <div className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Name:</strong> {result.first_name} {result.last_name}</p>
          <p>
            <strong>LinkedIn:</strong> <a href={result.linkedin_url} className="text-blue-600 underline dark:text-blue-400" target="_blank" rel="noreferrer">{result.linkedin_url}</a>
          </p>
          <p>
            <strong>GitHub:</strong> <a href={result.github_url} className="text-blue-600 underline dark:text-blue-400" target="_blank" rel="noreferrer">{result.github_url}</a>
          </p>
          <p><strong>ATS Score:</strong> {result.ats_score || 0}/100</p>

          <div className="mt-4">
            <strong>Skills:</strong>
            <div className="mt-1 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-400">
              {result.skills}
            </div>
          </div>

          {result.education && (
            <div className="mt-4">
              <strong>Education:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(result.education).map(([key, edu]) => (
                  <li key={key}>{edu.title} ({edu.duration})</li>
                ))}
              </ul>
            </div>
          )}

          {result.experience && (
            <div className="mt-4">
              <strong>Experience:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(result.experience).map(([key, exp]) => (
                  <li key={key}>
                    <div className="font-medium">{exp.title} ({exp.duration})</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{exp.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 text-yellow-600 dark:text-yellow-400 font-medium bg-yellow-50 dark:bg-yellow-900 p-3 rounded-lg">
            ⚠️ Resume uploading is disabled. Upgrade to Pro to unlock more features.
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default PDFExtractor;
