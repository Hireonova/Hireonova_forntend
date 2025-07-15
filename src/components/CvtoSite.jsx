import React, { useState, useEffect, useRef, useCallback } from 'react';

function CvtoSite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white font-inter p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400">
        Build What You Deserve!
        </h1>
      <CvtoSiteBuilder />
    </div>
  );
}

function RenderedWebsite({ htmlString, title, favicon, iframeRef }) {
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Clear and rewrite the document content
      // Removed redundant open/write/close calls
      doc.open();
      doc.write(htmlString);
      doc.close();
      
      // Ensure contenteditable elements are set
      // This is necessary if the initial htmlString doesn't always contain contenteditable="true"
      // and you want to enable editing after load.
      const elements = doc.querySelectorAll('[contenteditable="true"]');
      elements.forEach(el => el.contentEditable = 'true');
      
      const updateIframeHead = () => {
        const existingTitle = doc.querySelector('title');
        if (existingTitle) existingTitle.remove();
        const existingFavicon = doc.querySelector('link[rel*="icon"]');
        if (existingFavicon) existingFavicon.remove();
        
        const newTitle = doc.createElement('title');
        newTitle.textContent = title;
        doc.head.appendChild(newTitle);
        
        if (favicon) {
          const newFavicon = doc.createElement('link');
          newFavicon.rel = 'icon';
          newFavicon.href = favicon;
          doc.head.appendChild(newFavicon);
        }
      };
      
      // Call updateIframeHead after the iframe content is fully loaded
      // or immediately if it's already complete.
      iframe.onload = updateIframeHead;
      if (doc.readyState === 'complete') updateIframeHead();
    }
  }, [htmlString, title, favicon]); // Dependencies for useEffect

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0 rounded-b-lg"
      title="Website Preview"
      // Sandbox attributes for security
      // allow-same-origin is crucial for iframe content to be editable
      sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin allow-pointer-lock"
    />
  );
}

export default CvtoSite;


function CvtoSiteBuilder() {
  const [currentStep, setCurrentStep] = useState('templates'); // 'templates' or 'builder'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [email, setEmail] = useState('');
  const [customDomain, setCustomDomain] = useState('my-cv-site.com');
  const [customTitle, setCustomTitle] = useState('My CV Website');
  const [faviconUrl, setFaviconUrl] = useState('https://placehold.co/32x32/007bff/FFFFFF?text=CV');
  const [errorMessage, setErrorMessage] = useState('');
  const [deploymentMessage, setDeploymentMessage] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const iframeRef = useRef(null);

  // Template configurations
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      preview: '/api/placeholder/400/300', // Placeholder for a preview image
      description: 'Clean, modern design with blue accents and professional layout',
      color: 'blue',
      htmlTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{{title}}</title>
            <link rel="icon" href="{{favicon}}">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f4f7f6; }
                .container { max-width: 900px; margin: 30px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #007bff; }
                .name { font-size: 3rem; font-weight: 700; color: #007bff; margin-bottom: 10px; }
                .contact-info { font-size: 1.1rem; color: #666; }
                .contact-info a { color: #007bff; text-decoration: none; }
                .contact-info a:hover { text-decoration: underline; }
                .section { margin-bottom: 35px; }
                .section-title { font-size: 1.8rem; color: #007bff; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #eee; }
                .profile-summary { font-size: 1.1rem; text-align: center; color: #555; background: #f8f9fa; padding: 20px; border-radius: 8px; }
                .job, .education-item { margin-bottom: 25px; }
                .job-title, .degree-title { font-size: 1.3rem; font-weight: 600; color: #333; }
                .company, .university { font-size: 1.1rem; color: #007bff; font-weight: 500; }
                .duration { color: #666; font-size: 0.95rem; margin-bottom: 8px; }
                .description { color: #555; margin-top: 8px; }
                .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 15px; }
                .skill-tag { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 8px 12px; border-radius: 20px; text-align: center; font-size: 0.9rem; font-weight: 500; }
                .project { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #007bff; }
                .project-title { font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 8px; }
                .project-links { margin-top: 10px; }
                .project-links a { color: #007bff; text-decoration: none; margin-right: 15px; }
                .project-links a:hover { text-decoration: underline; }
                @media (max-width: 768px) {
                    .container { margin: 10px; padding: 20px; }
                    .name { font-size: 2.2rem; }
                    .skills-grid { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="name">{{name}}</h1>
                    <div class="contact-info">
                        Email: <a href="mailto:{{email}}">{{email}}</a> | Phone: {{phone}} | 
                        <a href="{{linkedin}}" target="_blank">LinkedIn</a> | 
                        <a href="{{github}}" target="_blank">GitHub</a>
                    </div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Profile Summary</h2>
                    <div class="profile-summary">{{summary}}</div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Work Experience</h2>
                    {{experience}}
                </div>
                
                <div class="section">
                    <h2 class="section-title">Education</h2>
                    {{education}}
                </div>
                
                <div class="section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-grid">{{skills}}</div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Projects</h2>
                    {{projects}}
                </div>
            </div>
        </body>
        </html>
      `
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      preview: '/api/placeholder/400/300', // Placeholder for a preview image
      description: 'Vibrant design with colorful accents, perfect for creative professionals',
      color: 'purple',
      htmlTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{{title}}</title>
            <link rel="icon" href="{{favicon}}">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
                .container { max-width: 900px; margin: 30px auto; background: white; padding: 0; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); overflow: hidden; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
                .name { font-size: 3rem; font-weight: 900; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
                .contact-info { font-size: 1.1rem; opacity: 0.9; }
                .contact-info a { color: white; text-decoration: none; }
                .contact-info a:hover { text-decoration: underline; }
                .content { padding: 40px; }
                .section { margin-bottom: 35px; }
                .section-title { font-size: 1.8rem; color: #667eea; margin-bottom: 20px; position: relative; }
                .section-title::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 60px; height: 3px; background: linear-gradient(135deg, #667eea, #764ba2); }
                .profile-summary { font-size: 1.1rem; color: #555; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; }
                .job, .education-item { margin-bottom: 25px; padding: 20px; border-radius: 10px; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
                .job-title, .degree-title { font-size: 1.3rem; font-weight: 600; color: #333; }
                .company, .university { font-size: 1.1rem; color: #667eea; font-weight: 500; }
                .duration { color: #666; font-size: 0.95rem; margin-bottom: 8px; }
                .description { color: #555; margin-top: 8px; }
                .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-top: 15px; }
                .skill-tag { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px 15px; border-radius: 25px; text-align: center; font-size: 0.9rem; font-weight: 500; transform: scale(1); transition: transform 0.2s; }
                .skill-tag:hover { transform: scale(1.05); }
                .project { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px; border-radius: 15px; margin-bottom: 20px; }
                .project-title { font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 8px; }
                .project-links { margin-top: 10px; }
                .project-links a { color: #667eea; text-decoration: none; margin-right: 15px; font-weight: 500; }
                .project-links a:hover { text-decoration: underline; }
                @media (max-width: 768px) {
                    .container { margin: 10px; }
                    .header { padding: 30px 20px; }
                    .content { padding: 20px; }
                    .name { font-size: 2.2rem; }
                    .skills-grid { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="name">{{name}}</h1>
                    <div class="contact-info">
                        Email: <a href="mailto:{{email}}">{{email}}</a> | Phone: {{phone}} | 
                        <a href="{{linkedin}}" target="_blank">LinkedIn</a> | 
                        <a href="{{github}}" target="_blank">GitHub</a>
                    </div>
                </div>
                
                <div class="content">
                    <div class="section">
                        <h2 class="section-title">Profile Summary</h2>
                        <div class="profile-summary">{{summary}}</div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Work Experience</h2>
                        {{experience}}
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Education</h2>
                        {{education}}
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Skills</h2>
                        <div class="skills-grid">{{skills}}</div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Projects</h2>
                        {{projects}}
                    </div>
                </div>
            </div>
        </body>
        </html>
      `
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      preview: '/api/placeholder/400/300', // Placeholder for a preview image
      description: 'Simple, clean design focused on content and readability',
      color: 'gray',
      htmlTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{{title}}</title>
            <link rel="icon" href="{{favicon}}">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Georgia', serif; line-height: 1.8; color: #333; background: #fff; max-width: 800px; margin: 0 auto; padding: 60px 40px; }
                .header { margin-bottom: 60px; }
                .name { font-size: 2.5rem; font-weight: 300; color: #2c3e50; margin-bottom: 15px; letter-spacing: 1px; }
                .contact-info { font-size: 1rem; color: #7f8c8d; }
                .contact-info a { color: #2c3e50; text-decoration: none; border-bottom: 1px solid #bdc3c7; }
                .contact-info a:hover { border-bottom-color: #2c3e50; }
                .section { margin-bottom: 50px; }
                .section-title { font-size: 1.4rem; color: #2c3e50; margin-bottom: 25px; font-weight: 400; text-transform: uppercase; letter-spacing: 2px; }
                .profile-summary { font-size: 1.1rem; color: #555; font-style: italic; margin-bottom: 30px; }
                .job, .education-item { margin-bottom: 30px; }
                .job-title, .degree-title { font-size: 1.1rem; font-weight: 600; color: #2c3e50; }
                .company, .university { font-size: 1rem; color: #7f8c8d; font-style: italic; }
                .duration { color: #95a5a6; font-size: 0.9rem; margin-bottom: 8px; }
                .description { color: #555; margin-top: 8px; }
                .skills-list { margin-top: 15px; }
                .skill-tag { display: inline-block; background: #ecf0f1; color: #2c3e50; padding: 6px 12px; margin: 4px 8px 4px 0; border-radius: 3px; font-size: 0.9rem; }
                .project { margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px solid #ecf0f1; }
                .project:last-child { border-bottom: none; }
                .project-title { font-size: 1.1rem; font-weight: 600; color: #2c3e50; margin-bottom: 8px; }
                .project-links { margin-top: 10px; }
                .project-links a { color: #7f8c8d; text-decoration: none; margin-right: 15px; border-bottom: 1px solid #bdc3c7; }
                .project-links a:hover { color: #2c3e50; border-bottom-color: #2c3e50; }
                @media (max-width: 768px) {
                    body { padding: 30px 20px; }
                    .name { font-size: 2rem; }
                    .skills-list { display: block; }
                    .skill-tag { display: block; margin: 5px 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="name">{{name}}</h1>
                <div class="contact-info">
                    Email: <a href="mailto:{{email}}">{{email}}</a> | Phone: {{phone}} | 
                    <a href="{{linkedin}}" target="_blank">LinkedIn</a> | 
                    <a href="{{github}}" target="_blank">GitHub</a>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Profile Summary</h2>
                <div class="profile-summary">{{summary}}</div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Work Experience</h2>
                {{experience}}
            </div>
            
            <div class="section">
                <h2 class="section-title">Education</h2>
                {{education}}
            </div>
            
            <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-list">{{skills}}</div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Projects</h2>
                {{projects}}
            </div>
        </body>
        </html>
      `
    },
    {
      id: 'tech',
      name: 'Tech Professional',
      preview: '/api/placeholder/400/300', // Placeholder for a preview image
      description: 'Dark theme with tech-inspired design elements',
      color: 'green',
      htmlTemplate: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{{title}}</title>
            <link rel="icon" href="{{favicon}}">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Courier New', monospace; line-height: 1.6; color: #00ff00; background: #0d1117; min-height: 100vh; }
                .container { max-width: 900px; margin: 30px auto; background: #161b22; padding: 0; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); border: 1px solid #30363d; }
                .header { background: #21262d; color: #00ff00; padding: 40px; text-align: center; border-bottom: 2px solid #00ff00; }
                .name { font-size: 3rem; font-weight: 700; margin-bottom: 10px; text-shadow: 0 0 10px #00ff00; }
                .contact-info { font-size: 1.1rem; color: #58a6ff; }
                .contact-info a { color: #58a6ff; text-decoration: none; }
                .contact-info a:hover { color: #00ff00; text-decoration: underline; }
                .content { padding: 40px; }
                .section { margin-bottom: 35px; }
                .section-title { font-size: 1.8rem; color: #00ff00; margin-bottom: 20px; position: relative; }
                .section-title::before { content: '> '; color: #58a6ff; }
                .profile-summary { font-size: 1.1rem; color: #c9d1d9; background: #21262d; padding: 20px; border-radius: 6px; border-left: 4px solid #00ff00; }
                .job, .education-item { margin-bottom: 25px; padding: 20px; background: #21262d; border-radius: 6px; border: 1px solid #30363d; }
                .job-title, .degree-title { font-size: 1.3rem; font-weight: 600; color: #00ff00; }
                .company, .university { font-size: 1.1rem; color: #58a6ff; font-weight: 500; }
                .duration { color: #7d8590; font-size: 0.95rem; margin-bottom: 8px; }
                .description { color: #c9d1d9; margin-top: 8px; }
                .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 15px; }
                .skill-tag { background: #21262d; color: #00ff00; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 0.9rem; font-weight: 500; border: 1px solid #30363d; }
                .project { background: #21262d; padding: 20px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #30363d; }
                .project-title { font-size: 1.2rem; font-weight: 600; color: #00ff00; margin-bottom: 8px; }
                .project-links { margin-top: 10px; }
                .project-links a { color: #58a6ff; text-decoration: none; margin-right: 15px; }
                .project-links a:hover { color: #00ff00; text-decoration: underline; }
                @media (max-width: 768px) {
                    .container { margin: 10px; }
                    .header { padding: 30px 20px; }
                    .content { padding: 20px; }
                    .name { font-size: 2.2rem; }
                    .skills-grid { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="name">{{name}}</h1>
                    <div class="contact-info">
                        Email: <a href="mailto:{{email}}">{{email}}</a> | Phone: {{phone}} | 
                        <a href="{{linkedin}}" target="_blank">LinkedIn</a> | 
                        <a href="{{github}}" target="_blank">GitHub</a>
                    </div>
                </div>
                
                <div class="content">
                    <div class="section">
                        <h2 class="section-title">Profile Summary</h2>
                        <div class="profile-summary">{{summary}}</div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Work Experience</h2>
                        {{experience}}
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Education</h2>
                        {{education}}
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Skills</h2>
                        <div class="skills-grid">{{skills}}</div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">Projects</h2>
                        {{projects}}
                    </div>
                </div>
            </div>
        </body>
        </html>
      `
    }
  ];

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Fetch resume data from API
  // Modified to return the fetched data
  const fetchResumeData = async () => {
    if (!email) {
      setError('No email found. Please log in first.');
      return null; // Return null on error
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://hireonova-backend.vercel.app/api/resume?email=${encodeURIComponent(email)}`); // Added encodeURIComponent for safety
      if (!response.ok) {
        // More specific error message based on status
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch resume data');
      }
      
      const data = await response.json();
      setResumeData(data); // Still update state for other effects/components
      
      // Set default values from resume data
      if (data.resumes && data.resumes.length > 0) {
        const firstResume = data.resumes[0];
        // Provide a more robust fallback for name
        setCustomTitle(`${firstResume.data.name ? `${firstResume.data.name}'s` : 'Professional'} CV Website`);
      }
      return data; // Return the fetched data
    } catch (err) {
      setError(`Error fetching resume: ${err.message}`); // More informative error
      return null; // Return null on error
    } finally {
      setLoading(false);
    }
  };

  // Generate HTML from template and resume data
  const generateHTML = useCallback((template, data) => {
    if (!template || !data) return '';

    let html = template.htmlTemplate;
    
    // Helper function for safe HTML encoding to prevent XSS
    const escapeHtml = (unsafe) => {
      if (typeof unsafe !== 'string') return unsafe;
      return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    };

    // Replace basic placeholders with safely escaped data
    html = html.replace(/\{\{title\}\}/g, escapeHtml(customTitle));
    html = html.replace(/\{\{favicon\}\}/g, escapeHtml(faviconUrl));
    html = html.replace(/\{\{email\}\}/g, escapeHtml(email));
    html = html.replace(/\{\{name\}\}/g, escapeHtml(data.name || 'John Doe'));
    html = html.replace(/\{\{phone\}\}/g, escapeHtml(data.phone || '+1 (555) 123-4567'));
    // URLs should be encoded for href attributes, not necessarily HTML escaped for display
    html = html.replace(/\{\{linkedin\}\}/g, encodeURI(data.linkedin || 'https://linkedin.com/in/johndoe'));
    html = html.replace(/\{\{github\}\}/g, encodeURI(data.github || 'https://github.com/johndoe'));
    html = html.replace(/\{\{summary\}\}/g, escapeHtml(data.summary || 'Experienced professional with expertise in various technologies and a passion for innovation.'));

    // Generate Skills HTML
    let skillsHTML = '';
    if (data.skills) {
      const skillsArray = data.skills.split(',').map(skill => skill.trim());
      skillsHTML = skillsArray.map(skill => 
        template.id === 'minimal' 
          ? `<span class="skill-tag">${escapeHtml(skill)}</span>`
          : `<div class="skill-tag">${escapeHtml(skill)}</div>`
      ).join('');
    }
    html = html.replace(/\{\{skills\}\}/g, skillsHTML);

    // Generate Experience HTML
    let experienceHTML = '';
    // Ensure data.experience is an array or object to iterate over
    if (data.experience && typeof data.experience === 'object') {
      Object.values(data.experience).forEach(exp => {
        experienceHTML += `
          <div class="job">
            <h3 class="job-title">${escapeHtml(exp.title || 'Job Title')}</h3>
            <p class="company">${escapeHtml(exp.company || 'Company Name')}</p>
            <p class="duration">${escapeHtml(exp.duration || 'Start Date - End Date')}</p>
            <div class="description">${exp.description ? escapeHtml(exp.description).replace(/\n/g, '<br>') : ''}</div>
          </div>
        `;
      });
    }
    html = html.replace(/\{\{experience\}\}/g, experienceHTML);

    // Generate Education HTML
    let educationHTML = '';
    // Ensure data.education is an array or object to iterate over
    if (data.education && typeof data.education === 'object') {
      Object.values(data.education).forEach(edu => {
        educationHTML += `
          <div class="education-item">
            <h3 class="degree-title">${escapeHtml(edu.degree || 'Degree/Qualification')}</h3>
            <p class="university">${escapeHtml(edu.title || 'University/Institution')}</p>
            <p class="duration">${escapeHtml(edu.duration || 'Start Date - End Date')}</p>
          </div>
        `;
      });
    }
    html = html.replace(/\{\{education\}\}/g, educationHTML);

    // Generate Projects HTML (placeholder for now, consider dynamic generation from resumeData later)
    let projectsHTML = '';
    // If you have project data in resumeData, you can iterate here similarly to experience/education
    // For now, keeping the placeholder as per original, but made it dynamic based on if data.projects exists
    if (data.projects && typeof data.projects === 'object' && Object.keys(data.projects).length > 0) {
        Object.values(data.projects).forEach(proj => {
            projectsHTML += `
                <div class="project">
                    <h3 class="project-title">${escapeHtml(proj.title || 'Project Title')}</h3>
                    <p>${escapeHtml(proj.description || 'Project description.')}</p>
                    <div class="project-links">
                        ${proj.liveLink ? `<a href="${encodeURI(proj.liveLink)}" target="_blank">Live Demo</a>` : ''}
                        ${proj.githubLink ? `<a href="${encodeURI(proj.githubLink)}" target="_blank">GitHub</a>` : ''}
                    </div>
                </div>
            `;
        });
    } else {
        // Fallback placeholder if no project data
        projectsHTML = `
            <div class="project">
                <h3 class="project-title">Sample Project</h3>
                <p>This is a placeholder for your projects. You can edit this section to add your actual projects.</p>
                <div class="project-links">
                    <a href="#" target="_blank">Live Demo</a>
                    <a href="#" target="_blank">GitHub</a>
                </div>
            </div>
        `;
    }
    html = html.replace(/\{\{projects\}\}/g, projectsHTML);

    return html;
  }, [customTitle, faviconUrl, email]); // Dependencies for useCallback

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // If resumeData is already available, generate HTML immediately
    if (resumeData && resumeData.resumes && resumeData.resumes.length > 0) {
      const generatedHTML = generateHTML(template, resumeData.resumes[0].data);
      setHtmlContent(generatedHTML);
    }
    // Don't change step here, wait for "Continue to Builder" click
  };

  // Handle proceeding to builder step
  const handleProceedToBuilder = async () => {
    if (!selectedTemplate) {
      setError('Please select a template first.');
      return;
    }
    
    let currentResumeData = resumeData; // Use current state value
    // If resumeData is not already available or is empty, fetch it
    if (!currentResumeData || !currentResumeData.resumes || currentResumeData.resumes.length === 0) {
        currentResumeData = await fetchResumeData(); // Await and capture the returned data
    }
    
    // Now use the potentially newly fetched data (currentResumeData)
    if (currentResumeData && currentResumeData.resumes && currentResumeData.resumes.length > 0) {
      const generatedHTML = generateHTML(selectedTemplate, currentResumeData.resumes[0].data);
      setHtmlContent(generatedHTML);
      setCurrentStep('builder');
      setError(''); // Clear any previous error on successful data load/proceed
    } else {
        // If data is still not available after fetch attempt
        setError(prev => prev || 'Could not load resume data. Please ensure your email is correct and resume exists.');
    }
  };

  // Function to process HTML content for final output (e.g., download, new tab)
  const getProcessedHtml = useCallback((currentHtml) => {
    let processedHtml = currentHtml;
    // Replace dynamic placeholders in case they weren't in the initial template or changed
    processedHtml = processedHtml.replace(/\{\{email\}\}/g, email);
    // Update title tag
    processedHtml = processedHtml.replace(/<title>.*?<\/title>/i, `<title>${customTitle}</title>`);
    // Remove existing favicon links to prevent duplicates
    processedHtml = processedHtml.replace(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*?>/gi, '');
    // Add new favicon link if provided
    if (faviconUrl) {
      processedHtml = processedHtml.replace(/<\/head>/i, `<link rel="icon" href="${faviconUrl}"></head>`);
    }
    return processedHtml;
  }, [email, customTitle, faviconUrl]); // Dependencies for useCallback

  const handleGeneratePreview = () => {
    // If there's an iframe and it has content, capture its current HTML (including edits)
    // Otherwise, use the last generated htmlContent
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const currentDoc = iframeRef.current.contentDocument.documentElement.outerHTML;
      setHtmlContent(currentDoc);
    } else if (selectedTemplate && resumeData && resumeData.resumes && resumeData.resumes.length > 0) {
        // Regenerate if iframe is not ready or no content yet
        const generatedHTML = generateHTML(selectedTemplate, resumeData.resumes[0].data);
        setHtmlContent(generatedHTML);
    } else {
        setErrorMessage('Cannot generate preview: No template selected or resume data loaded.');
        return;
    }
    setShowPreview(true);
    setErrorMessage('');
    setDeploymentMessage('');
  };

  const handleOpenInNewTab = () => {
    if (!htmlContent) {
        // Attempt to generate if not already done
        if (selectedTemplate && resumeData && resumeData.resumes && resumeData.resumes.length > 0) {
            const generatedHTML = generateHTML(selectedTemplate, resumeData.resumes[0].data);
            setHtmlContent(generatedHTML);
        } else {
            setErrorMessage('HTML content is not available yet. Please select a template and load resume data first.');
            return;
        }
    }

    try {
      // Get the current editable HTML from the iframe if it exists, otherwise use current htmlContent
      const currentEditableHtml = iframeRef.current?.contentDocument?.documentElement?.outerHTML || htmlContent;
      const finalHtmlForNewTab = getProcessedHtml(currentEditableHtml);
      const blob = new Blob([finalHtmlForNewTab], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
          setErrorMessage('Pop-up blocked! Please allow pop-ups for this site.');
      } else {
          setErrorMessage(''); // Clear any previous error
      }
    } catch (e) {
      console.error("Error opening in new tab:", e);
      setErrorMessage('Could not open website in a new tab. An unexpected error occurred.');
    }
  };

  const handleSaveAndDeploy = () => {
    if (!htmlContent) {
        // Attempt to generate if not already done
        if (selectedTemplate && resumeData && resumeData.resumes && resumeData.resumes.length > 0) {
            const generatedHTML = generateHTML(selectedTemplate, resumeData.resumes[0].data);
            setHtmlContent(generatedHTML);
        } else {
            setErrorMessage('HTML content is not available to save. Please select a template and load resume data first.');
            return;
        }
    }
    
    // Get the current editable HTML from the iframe if it exists, otherwise use current htmlContent
    const currentEditableHtml = iframeRef.current?.contentDocument?.documentElement?.outerHTML || htmlContent;
    const finalHtmlToSave = getProcessedHtml(currentEditableHtml);
    
    const blob = new Blob([finalHtmlToSave], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Sanitize customTitle for filename
    const fileName = `${customTitle.replace(/[^a-z0-9\-\.]/gi, '_').toLowerCase() || 'my-cv'}.html`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object

    setDeploymentMessage(`Your website HTML has been downloaded as "${a.download}". Upload this file to any web hosting platform (e.g., Netlify, Vercel, GitHub Pages) to deploy it. If you have a custom domain like "${customDomain}", configure it with your hosting provider.`);
    setErrorMessage(''); // Clear any previous error
  };

  // Effect to generate initial HTML content when template or resume data changes,
  // particularly after the resumeData is fetched.
  useEffect(() => {
    if (selectedTemplate && resumeData && resumeData.resumes && resumeData.resumes.length > 0) {
        const generatedHTML = generateHTML(selectedTemplate, resumeData.resumes[0].data);
        setHtmlContent(generatedHTML);
    }
  }, [selectedTemplate, resumeData, generateHTML]); // Depend on selectedTemplate, resumeData, and generateHTML

  // Template Selection Step
  if (currentStep === 'templates') {
    return (
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Choose Your Template</h2>
          <p className="text-gray-600 dark:text-gray-300">Select a template that matches your style and profession</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template) => (
            <div
              key={template.id} // Added key prop for list rendering
              className={`cursor-pointer rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTemplateSelect(template)} // Changed to use handleTemplateSelect
            >
              <div className="p-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <div className={`text-4xl ${
                    template.color === 'blue' ? 'text-blue-500' :
                    template.color === 'purple' ? 'text-purple-500' :
                    template.color === 'gray' ? 'text-gray-500' :
                    'text-green-500'
                  }`}>
                    📄
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleProceedToBuilder}
            disabled={!selectedTemplate || loading}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedTemplate && !loading
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Loading Resume Data...' : 'Continue to Builder'}
          </button>
        </div>
      </div>
    );
  }

  // Builder Step
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          CV Website Builder - {selectedTemplate?.name}
        </h2>
        <button
          onClick={() => setCurrentStep('templates')}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Change Template
        </button>
      </div>

      {errorMessage && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}
      
      {deploymentMessage && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded relative mb-4 text-sm whitespace-pre-wrap">
          {deploymentMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Domain
          </label>
          <input
            id="customDomain" // Added id for accessibility
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            className="w-full p-3 border rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="my-cv-site.com"
          />
        </div>
        
        <div>
          <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website Title
          </label>
          <input
            id="customTitle" // Added id for accessibility
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full p-3 border rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="My CV Website"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Favicon URL
          </label>
          <input
            id="faviconUrl" // Added id for accessibility
            type="url"
            value={faviconUrl}
            onChange={(e) => setFaviconUrl(e.target.value)}
            className="w-full p-3 border rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/favicon.ico"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleGeneratePreview}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Update Preview
        </button>
        <button
          onClick={handleOpenInNewTab}
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-semibold"
        >
          Open in New Tab
        </button>
        <button
          onClick={handleSaveAndDeploy}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
        >
          Save & Deploy
        </button>
      </div>

      {showPreview && (
        <div className="mt-8 border rounded-lg overflow-hidden shadow-xl">
          <div className="bg-gray-100 dark:bg-zinc-700 p-3 flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
              Preview of: https://{customDomain}
            </span>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xl"
              aria-label="Close Preview" // Added for accessibility
            >
              ×
            </button>
          </div>
          <div className="w-full h-[600px] bg-white dark:bg-zinc-900">
            <RenderedWebsite
              htmlString={htmlContent}
              title={customTitle}
              favicon={faviconUrl}
              iframeRef={iframeRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}