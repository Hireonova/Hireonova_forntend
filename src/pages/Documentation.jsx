import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu, X, BookOpen, FileText, Code, Settings, Home } from 'lucide-react';
import docJson from '../assets/documentation.json';

const iconMap = {
  Home: Home,
  Code: Code,
  FileText: FileText,
  Settings: Settings
};

const Documentation = () => {
  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('getting-started');
  const [currentPage, setCurrentPage] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const processedData = {
        ...docJson,
        sections: docJson.sections.map(section => ({
          ...section,
          icon: iconMap[section.icon] || FileText
        }))
      };
      setDocData(processedData);
    } catch (error) {
      console.error('Error loading documentation:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentPageData = () => {
    const section = docData?.sections.find(s => s.id === currentSection);
    return section?.pages.find(p => p.id === currentPage);
  };

  const getAllPages = () => {
    if (!docData) return [];
    return docData.sections.flatMap(section =>
      section.pages.map(page => ({
        ...page,
        sectionId: section.id,
        sectionTitle: section.title
      }))
    );
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const filteredSections = docData
    ? docData.sections
        .map(section => ({
          ...section,
          pages: section.pages.filter(
            page =>
              page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              page.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(section => section.pages.length > 0)
    : [];

  const renderMarkdown = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {highlightText(line.substring(2), searchQuery)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            {highlightText(line.substring(3), searchQuery)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
            {highlightText(line.substring(4), searchQuery)}
          </h3>
        );
      } else if (line.startsWith('```')) {
        return (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm my-2">
            {highlightText(line, searchQuery)}
          </div>
        );
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-600 dark:text-gray-400 ml-4 my-1">
            {highlightText(line.substring(2), searchQuery)}
          </li>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed my-2">
            {highlightText(line, searchQuery)}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  const navigateToPage = (sectionId, pageId) => {
    setCurrentSection(sectionId);
    setCurrentPage(pageId);
    setSidebarOpen(false);
  };

  const currentPageData = getCurrentPageData();
  const allPages = getAllPages();
  const currentPageIndex = allPages.findIndex(p => p.id === currentPage);
  const previousPage = currentPageIndex > 0 ? allPages[currentPageIndex - 1] : null;
  const nextPage = currentPageIndex < allPages.length - 1 ? allPages[currentPageIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (!docData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Failed to load documentation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Documentation</h1>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 dark:text-white placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-80 xl:w-96`}>
            <div className="sticky top-24 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {(searchQuery ? filteredSections : docData.sections).map(section => (
                <div key={section.id} className="space-y-1 mb-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <section.icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </div>
                  {section.pages.map(page => (
                    <button
                      key={page.id}
                      onClick={() => navigateToPage(section.id, page.id)}
                      className={`block w-full text-left px-6 py-2 text-sm rounded-lg transition-all ${
                        currentPage === page.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {searchQuery ? highlightText(page.title, searchQuery) : page.title}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
              {currentPageData ? (
                <article className="prose prose-gray dark:prose-invert max-w-none">
                  {renderMarkdown(currentPageData.content)}
                </article>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Page not found</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between">
              {previousPage ? (
                <button
                  onClick={() => navigateToPage(previousPage.sectionId, previousPage.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{previousPage.title}</p>
                  </div>
                </button>
              ) : <div />}
              {nextPage ? (
                <button
                  onClick={() => navigateToPage(nextPage.sectionId, nextPage.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
                >
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{nextPage.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
