import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const techIcons = [
  { src: 'https://i.postimg.cc/sXBSdgLs/ollama-logo-png-seeklogo-593420-removebg-preview.png', label: 'Ollama' },
  { src: 'https://i.postimg.cc/4yDn64LN/download-removebg-preview.png', label: 'Python' },
  { src: 'https://i.postimg.cc/wjs7jNBy/Selenium-Logo.png', label: 'Selenium' },
  { src: 'https://i.postimg.cc/HstrNMLb/images-9.png', label: 'Pandas' },
  { src: 'https://i.postimg.cc/zGcGmFYH/images-10.png', label: 'Chromium' },
  { src: 'https://i.postimg.cc/Z5CJLvvb/playwright-q55xzpenhgjsodksybst.webp', label: 'Playwright' },
  { src: 'https://i.postimg.cc/bvn87XR4/images-1-removebg-preview.png', label: 'BeautifulSoup' },
  { src: 'https://i.postimg.cc/FHdQStw1/dab2bd00-0ed2-11eb-8588-5e10679ace4d.png', label: 'UserAgent' },
  { src: 'https://i.postimg.cc/JndqZFf4/110818415.png', label: 'Pydantic' },
];

const TechStack = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // initial value
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="w-full bg-transparent text-zinc-900 dark:text-white py-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
          {/* Left Text - 30% on large screens */}
          <div className="w-full lg:w-[30%] text-lg font-semibold text-center lg:text-left">
            Made with these TechStacks
            <p className="mt-2 text-sm">
              Our platform is powered by cutting-edge Python tools and libraries for maximum scraping efficiency and performance.
            </p>
          </div>

          {/* Right Marquee - 70% on large screens */}
          <div className="w-full lg:w-[70%]">
            <div className="overflow-hidden">
              <Marquee
                gradient={false}
                speed={40}
                pauseOnHover
                className="w-full"
              >
                {techIcons.map(({ src, label }, i) => (
                  <div key={i} className="flex flex-col items-center mx-4 shrink-0">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-transparent">
                      <img
                        src={src}
                        alt={label}
                        className="max-h-full max-w-full object-contain"
                        style={{
                          filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/56x56/cccccc/000000?text=Icon';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
